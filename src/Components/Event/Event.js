import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Event.css';

const Event = (props) => {
  // console.log('Your Event props: ', props);
  const [likesEvent, setLikesEvent] = useState(false);
  const [eventData, setEventData] = useState(props.event);
  const { currentUser, token } = props;

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

  // console.log("CURRENT USER ID", currentUser._id);
  // let doesLike = false;
  // likes.forEach(elem => {
  //   console.log(elem.user);
  //   if (elem.user.toString() === currentUser._id.toString()) {
  //     console.log('wooo')
  //     // setLikesEvent(true);
  //     doesLike = true
  //   }
  // });
  // console.log("result of loop: ", doesLike)
  // setLikesEvent(doesLike);

  const attendeeList = eventData.going.map(attendee => {
    return <img src={attendee.avatar} className='attendee-avatar' alt='attendee avatar'/>
  })

  return (
    <div className='event-card' onClick={() => props.handleEventClick(props.event)}>
      <img className='avatar' src={eventData.creatorAvatar} alt='creator-avatar'/>
      <div className='event-card-info'>
        <h2 className='title'>{eventData.title}</h2>
        <p><span className='name'>{eventData.creatorName}</span> - <span className='date'>{eventData.eventDate}</span></p>
        <p><span className='sport'>{eventData.sport}</span> at <span className='location'>{eventData.location}</span></p>
        {/* <p>{eventData.details}</p> */}
        
        <div className='feedback-tray'>
          <div className='feedback-container'>
            <div className='likes' onClick={handleLike}>
              <FaRegHeart style={{color: 'black', fontSize: '20px'}}/> {eventData.likes.length}

              {/* {userLikes ?
                <FaHeart style={{color: 'red', fontSize: '20px'}}/>
                :
                <FaHeart style={{color: 'black', fontSize: '20px'}}/>
              } */}
            </div>
            <div className='attendee-list'>{attendeeList}</div>
          </div>
          <button className='attend-btn' type='button' onClick={handleAttendEvent}>Join</button>
        </div>
      </div>

    </div>
  )
}

export default Event;
