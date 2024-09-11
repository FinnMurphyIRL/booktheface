  // src/pages/SearchPage.js
  import React from 'react';
  import Search from '../components/Search/Search';
  import styles from './SearchPage.module.css';

  function SearchPage() {
    return (
      <div className={styles.searchPage}>
        <h1>Search</h1>
        <Search />
      </div>
    );
  }

  export default SearchPage;