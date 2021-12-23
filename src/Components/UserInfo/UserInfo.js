import React, { useEffect, useState, useContext } from 'react';
import './UserInfo.css';
import AuthContext from '../../store/auth-context';

const UserInfo = (props) => {
  // TODO: DELETE
  // console.log('Your UserInfo props: ', props);

  const authContext = useContext(AuthContext);

  // const { username, location, following, avatar, invites } = props.currentUser;
  const { username, avatar, location } = props.currentUser;
  

  return (
    <section className='user-info-section'>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <img className='avatar' src={avatar}  alt='avatar'/>
            <h2 className='username'>{username}</h2>
            <h4 className='location'>{location}</h4>
            <div className='invites'>
              <p>Invites: </p>
      
            </div>
          </>
        }
    </section>
  )
}

export default UserInfo;
