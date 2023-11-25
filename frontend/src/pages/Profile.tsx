import React from 'react';
import '../ProfilePage.css'; // Added the style file

const ProfilePage = () => {
  // User information
  const userInfo = {
    name: 'Fazlı Altun',
    age: 21,
    occupation: 'Mobile Developer',
    profilePicture: 'https://avatars.githubusercontent.com/u/32793348?v=4', // Avatar URL
  };

  return (
    <div className="profile-page">
      <div className="content-center">
        <div className="avatar-container">
          <img className="avatar" src={userInfo.profilePicture} alt="Profile Picture" />
        </div>
        <div className="profile-info">
          <h1>{userInfo.name}</h1>
          <p>{userInfo.age} years old</p>
          <p>{userInfo.occupation}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
