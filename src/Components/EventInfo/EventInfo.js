import React, { useEffect, useState } from 'react';
import './EventInfo.css';

const EventInfo = (props) => {
  console.log('Your Event Info Props: ', props);

  const { title, creatorAvatar, creatorName, details, eventDate, location, skillLevel, sport, comments, going } = props.selectedEvent;

  // const attendeeList = going.map(attendee => {
  //   return (
  //     <div className='attendee'>
  //       <img
  //         key={attendee.user}
  //         src={attendee.avatar}
  //         className="attendee-avatar"
  //         alt="attendee avatar"
  //       />
  //       <h4>{attendee.username}</h4>
  //     </div>
  //   );
  // });

  return (
    <section className='event-info-section'>
      <h2>Event Info</h2>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <h3 className='title'>{title}</h3>
            <p className='eventDate'><span>Date: </span>{eventDate}</p>
            <p className='creator'><span>Creator: </span>{creatorName}</p>
            <p className='location'><span>Location: </span>{location}</p>
            <p className='sport'><span>Sport: </span>{sport}</p>
            <p className='skillLevel'><span>Skill Level: </span>{skillLevel}</p>
            <p className='details'><span>Additional Info: </span>{details}</p>
            <div className='going-container'>
              <div className='going-heading'>
                <h4 className='going'><span>Going:</span></h4>
                <button type='button'>Join</button>
              </div>

            </div>
            <div className='comments-container'>
              <div className='comments-heading'>
                <h4 className='comments'><span>Comments:</span></h4>
                <button type='button'>Add</button>
              </div>
            </div>
          </>
        }
    </section>
  )
}

export default EventInfo;
