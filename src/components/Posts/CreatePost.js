// src/components/Posts/CreatePost.js
import React, { useState } from 'react';
import api from '../../services/api';
import styles from './CreatePost.module.css';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setContent('');
      setImage(null);
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.createPost}>
      <h3 className={styles.title}>Create a Post</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className={styles.textarea}
          required
        />
        <div className={styles.imageUpload}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            id="image-upload"
            className={styles.fileInput}
          />
          <label htmlFor="image-upload" className={styles.fileLabel}>
            {image ? 'Change Image' : 'Add Image'}
          </label>
          {image && <span className={styles.fileName}>{image.name}</span>}
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;