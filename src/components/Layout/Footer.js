// src/components/Layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/help">Help</Link>
        </div>
        <div className={styles.copyright}>
          © 2024 BookTheFace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;