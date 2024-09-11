// src/pages/Friends.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import styles from './Friends.module.css';

function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await api.get('/users/friends');
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await api.get('/users/friend-requests');
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAcceptFriend = async (userId) => {
    try {
      await api.post(`/users/accept-friend/${userId}`);
      fetchFriends();
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div className={styles.friendsContainer}>
      <h1>Friends</h1>
      <div className={styles.friendRequests}>
        <h2>Friend Requests</h2>
        {friendRequests.map((request) => (
          <div key={request._id} className={styles.friendRequest}>
            <Link to={`/profile/${request._id}`}>{request.name}</Link>
            <button onClick={() => handleAcceptFriend(request._id)} className={styles.acceptButton}>Accept</button>
          </div>
        ))}
      </div>
      <div className={styles.friendsList}>
        <h2>Your Friends</h2>
        {friends.map((friend) => (
          <div key={friend._id} className={styles.friend}>
            <Link to={`/profile/${friend._id}`}>{friend.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;