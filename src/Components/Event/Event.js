import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Event.css';

const Event = (props) => {
  // console.log('Your Event props: ', props);

  const { currentUser, token } = props;
  const [eventData, setEventData] = useState(props.event);
  const [userDoesLike, setUserDoesLike] = useState(false);

  useEffect(() => {
    setUserDoesLike(false);

    eventData.likes.forEach(like => {
      if (like.userID === currentUser._id) {
        setUserDoesLike(true);
      }
    });
  }, [eventData]);


  // TODO: Move handlers up to HomeContent and pass down as props

  const handleLike = async (event) => {
    const res = await fetch(`http://localhost:4000/events/like/${eventData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      // body: JSON.stringify(input),
    });
    const data = await res.json();

    // console.log('EVENT DATA', data.event);
    setEventData(data.event);
  }

  const handleAttendEvent = async (event) => {
    const res = await fetch(`http://localhost:4000/events/attend/${eventData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      // body: JSON.stringify(input),
    });
    const data = await res.json();

    // console.log('EVENT DATA', data.event);
    setEventData(data.event);
  }

  const handleDeleteEvent = async (event) => {
    const res = await fetch(`http://localhost:4000/events/${eventData._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      // body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log(data);
  }

  const attendeeList = eventData.going.map(attendee => {
    return (
      <img
        key={attendee.userID}
        src={attendee.avatar}
        className="attendee-avatar"
        alt="attendee avatar"
      />
    );
  });

  return (
    <div key={eventData._id} className='event-card' onClick={() => props.handleEventClick(props.event)}>
      <img className='avatar' src={eventData.creatorAvatar} alt='creator-avatar'/>
      <div className='event-card-info'>
        <h2 className='title'>{eventData.title}</h2>
        <p><span className='name'>{eventData.creatorName}</span> - <span className='date'>{eventData.eventDate}</span></p>
        <p><span className='sport'>{eventData.sport}</span> at <span className='location'>{eventData.location}</span></p>
        {/* <p>{eventData.details}</p> */}
        
        <div className='feedback-tray'>
          <div className='feedback-container'>
            <div className='likes' onClick={handleLike}>
              {userDoesLike ?
                <FaHeart className='likes-heart does-like'/>
                :
                <FaRegHeart className='likes-heart no-like'/>
              } {eventData.likes.length}
            </div>
            <div className='attendee-list'>{attendeeList}</div>
          </div>
          <div className='event-btn-container'>
            {
              currentUser._id === eventData.creatorID && <button className='delete-btn' type='button' onClick={handleDeleteEvent}>Delete</button>
            }
            
            <button className='attend-btn' type='button' onClick={handleAttendEvent}>Join</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Event;
