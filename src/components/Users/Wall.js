// src/components/Users/Wall.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import styles from './Wall.module.css';

function Wall({ userId }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchWallPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/wall`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching wall posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWallPosts();
  }, [fetchWallPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await api.post(`/users/${userId}/wall`, { content: newPost });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating wall post:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading wall posts...</div>;
  }

  return (
    <div className={styles.wall}>
      <h2 className={styles.title}>Wall</h2>
      <form onSubmit={handleSubmit} className={styles.postForm}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something on the wall..."
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>Post</button>
      </form>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <p className={styles.postAuthor}>{post.author.name}</p>
            <p className={styles.postContent}>{post.content}</p>
            <p className={styles.postDate}>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wall;