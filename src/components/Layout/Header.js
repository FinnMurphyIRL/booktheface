// src/components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">BookTheFace</Link>
      </div>
      <Search />
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;