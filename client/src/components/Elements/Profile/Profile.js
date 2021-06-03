import React from "react";
import Avatar from "../../../images/profile/avatar.png";
import "./Profile.css";
const Profile = ({ username, email }) => {
  return (
    <div className="profile-container">
      <img className="profile-img" src={Avatar} alt="user profile" />
      <h1 className="profile-username">Name: {username}</h1>
      <h1 className="profile-email">Email: {email}</h1>
    </div>
  );
};

export default Profile;
