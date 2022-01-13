import React, { useEffect, useState, useContext } from 'react';
import './UserInfo.css';
import AuthContext from '../../store/auth-context';

const UserInfo = (props) => {
  // TODO: DELETE
  // console.log('Your UserInfo props: ', props);

  const authContext = useContext(AuthContext);

  // const { name, location, following, avatar, invites } = props.currentUser;
  const { name, avatar, location } = props.currentUser;
  

  return (
    <section className='user-info-section'>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <div className='avatar-container'>
            <img className='avatar' src={avatar}  alt='avatar'/>
            </div>
            <h2 className='name'>{name}</h2>
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
