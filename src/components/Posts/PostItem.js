// src/components/Posts/PostItem.js
import React from 'react';
import api from '../../services/api';
import styles from './PostItem.module.css';

function PostItem({ post }) {
  const handleLike = async () => {
    try {
      await api.put(`/posts/like/${post._id}`);
      // Update post in state
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className={styles.postItem}>
      <h3 className={styles.author}>{post.author.name}</h3>
      <p className={styles.content}>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className={styles.image} />}
      <button className={styles.likeButton} onClick={handleLike}>Like ({post.likes.length})</button>
    </div>
  );
}

export default PostItem;