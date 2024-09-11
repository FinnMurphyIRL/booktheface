// src/pages/Home.js
import React from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import styles from './Home.module.css';

function Home() {
  console.log('Rendering Home component');
  return (
    <div className={styles.landingPage}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.title}>Welcome to BookTheFace</h1>
        <p className={styles.subtitle}>Connect with friends and the world around you on BookTheFace.</p>
      </div>
      <div className={styles.authSection}>
        <div className={styles.loginContainer}>
          <h2>Log In</h2>
          <Login />
        </div>
        <div className={styles.registerContainer}>
          <h2>Create a New Account</h2>
          <p>It's quick and easy.</p>
          <Register />
        </div>
      </div>
    </div>
  );
}

export default Home;