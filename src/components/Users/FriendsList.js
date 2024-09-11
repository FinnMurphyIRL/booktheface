// src/components/Users/FriendsList.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './FriendsList.module.css';

function FriendsList({ userId }) {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFriends = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/friends`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  if (isLoading) {
    return <div className={styles.loading}>Loading friends...</div>;
  }

  return (
    <div className={styles.friendsContainer}>
      <h3 className={styles.title}>Friends</h3>
      {friends.length === 0 ? (
        <p className={styles.noFriends}>No friends yet.</p>
      ) : (
        <ul className={styles.friendsList}>
          {friends.map((friend) => (
            <li key={friend._id} className={styles.friendItem}>
              <Link to={`/profile/${friend._id}`} className={styles.friendLink}>
                <img src={friend.profilePicture || '/default-avatar.png'} alt={friend.name} className={styles.friendPicture} />
                <span className={styles.friendName}>{friend.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendsList;