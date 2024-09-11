// src/pages/Profile.js
import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/Users/UserProfile";
import FriendsList from "../components/Users/FriendsList";
import Wall from "../components/Users/Wall";
import styles from "./Profile.module.css";

function Profile() {
  const { userId } = useParams();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftColumn}>
        <UserProfile userId={userId} />
        <FriendsList userId={userId} />
      </div>
      <div className={styles.rightColumn}>
        <Wall userId={userId} />
      </div>
    </div>
  );
}

export default Profile;
