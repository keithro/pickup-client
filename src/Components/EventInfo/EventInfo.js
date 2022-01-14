import React, { useContext, useState } from 'react';
import './EventInfo.css';

import AuthContext from '../../store/auth-context';

const EventInfo = (props) => {
  // console.log('Your Event Info Props: ', props);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://pick-up-api.herokuapp.com';
  const authContext = useContext(AuthContext);
  const [newCommentInput, setNewCommentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Add selectedEvent to a state?
  const {
    _id,
    title,
    // creatorAvatar,
    creatorName,
    details,
    eventDate,
    // createdDate,
    location,
    skillLevel,
    sport,
    comments,
    going,
  } = props.selectedEvent;

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch(`${API_ENDPOINT}/events/comment/${_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      },
      body: JSON.stringify({text: newCommentInput}),
    });
    const data = await res.json();
    props.setSelectedEvent(data.event);
    setIsLoading(false);
    setNewCommentInput('');
  }

  const handleCommentInputChange = (event) => {
    setNewCommentInput(event.target.value);
  }

  const handleDeleteComment = async (commentID) => {
    const res = await fetch(`${API_ENDPOINT}/events/comment/${_id}/${commentID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      }
    });
    const data = await res.json();
    props.setSelectedEvent(data.event);
  }

  const attendeeList = going.map(attendee => {
    return (
      <div className='attendee' key={attendee._id}>
        <img
          src={attendee.avatar}
          className="attendee-avatar"
          alt="attendee avatar"
        />
        <p className="attendee-name">{attendee.name}</p>
      </div>
    );
  });

  const commentList = comments.map(comment => {
    return (
      <div className="comment" key={comment._id}>
        <div className="comment-heading">
          <img
            src={comment.avatar}
            className="comment-avatar"
            alt="comment avatar"
          />
          <p className="comment-name">{comment.name}</p>
        </div>
        <div className="comment-body">
          <p className="comment-text">{comment.text}</p>
        </div>
        <div className="comment-footer">
          <p className="comment-date">{comment.date}</p>
          {props.currentUser._id === comment.userID && (
            <p className="comment-delete-btn" onClick={() => handleDeleteComment(comment._id)} >delete</p>
          )}
        </div>
      </div>
    );
  });

  return (
    <section className='event-info-section'>
      <h2>Event Info</h2>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <div className='event-details'>
              <h3 className='title'>{title}</h3>
              <p className='eventDate'><span>Date: </span>{eventDate}</p>
              <p className='creatorName'><span>Creator: </span>{creatorName}</p>
              <p className='location'><span>Location: </span>{location}</p>
              <p className='sport'><span>Sport: </span>{sport}</p>
              <p className='skillLevel'><span>Skill Level: </span>{skillLevel}</p>
              <p className='details'><span>Additional Info: </span>{details}</p>
            </div>

            <div className='going-container'>
              <div className='going-heading'>
                <h4>Going:</h4>
                {/* <button type='button'>Join</button> */}
              </div>
              {attendeeList}
            </div>
            <div className='comments-container'>
              <div className='comments-heading'>
                <h4>Comments:</h4>
              </div>
              {commentList}
              <div className='new-comment'>
                <form className='new-comment-form' onSubmit={handleCommentSubmit} >
                  <label for='newComment' className='new-comment-label'>Add Comment</label>
                  <textarea name='newComment' value={newCommentInput} onChange={handleCommentInputChange} className='new-comment-input' />
                  <button type='submit'className='new-comment-submit-btn' disabled={isLoading}>Add</button>
                </form>
              </div>
            </div>
          </>
        }
    </section>
  )
}

export default EventInfo;
