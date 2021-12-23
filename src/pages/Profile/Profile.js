import React, { useEffect, useState } from 'react';
import './Profile.css';
import Nav from '../../components/Nav/Nav';

const Profile = (props) => {
  

  // If not logged in redirect to home page
  
  return (
    <div>
      <Nav />
      <h1>Welcome to the ridiculously f@#*ing beautiful Profile page!</h1>
    </div>
  )
}

export default Profile;
