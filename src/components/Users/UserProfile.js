// src/components/Users/UserProfile.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import styles from './UserProfile.module.css';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${userId}`, editedUser);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!user) {
    return <div className={styles.error}>User not found.</div>;
  }

  return (
    <div className={styles.userProfile}>
      <img src={user.profilePicture || '/default-avatar.png'} alt={user.name} className={styles.profilePicture} />
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className={styles.input}
          />
          <textarea
            name="bio"
            value={editedUser.bio}
            onChange={handleChange}
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>Save</button>
          <button type="button" onClick={handleCancel} className={styles.button}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.bio}>{user.bio}</p>
          <button onClick={handleEdit} className={styles.button}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;