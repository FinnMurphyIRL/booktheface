// src/components/Posts/PostList.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import styles from './PostList.module.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get(`/posts?page=${page}&limit=10`);
      const newPosts = response.data.posts;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length === 10);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className={styles.postList}>
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
      {hasMore && (
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
}

export default PostList;