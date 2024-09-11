// src/pages/AuthenticatedHome.js
import React from 'react';
import PostList from '../components/Posts/PostList';
import styles from './AuthenticatedHome.module.css';

function AuthenticatedHome() {
  return (
    <div className={styles.authenticatedHome}>
      <h1 className={styles.welcome}>Welcome to BookTheFace</h1>
      <div className={styles.content}>
        <PostList />
      </div>
    </div>
  );
}

export default AuthenticatedHome;