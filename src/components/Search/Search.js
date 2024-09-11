// src/components/Search/Search.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './Search.module.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], posts: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error performing search:', error);
      alert('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for users or posts..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        <div className={styles.searchResults}>
          <div className={styles.userResults}>
            <h3>Users</h3>
            {results.users.map(user => (
              <Link key={user._id} to={`/profile/${user._id}`} className={styles.resultItem}>
                <img src={user.profilePicture || '/default-avatar.png'} alt={user.name} className={styles.userAvatar} />
                <span>{user.name}</span>
              </Link>
            ))}
          </div>
          <div className={styles.postResults}>
            <h3>Posts</h3>
            {results.posts.map(post => (
              <div key={post._id} className={styles.resultItem}>
                <Link to={`/profile/${post.author._id}`}>{post.author.name}</Link>
                <p>{post.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;