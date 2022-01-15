import React, { useContext, useState } from 'react';
import './NewEventForm.css'

import AuthContext from '../../store/auth-context';

const NewEventForm = (props) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const authContext = useContext(AuthContext);
  const initialFormVals = {
    title: '',
    details: '',
    eventDate: '',
    location: '',
    sport: '',
    skillLevel: '',
  }
  const [input, setInput] = useState(initialFormVals);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleCancel = () => {
    props.setShowEventForm(false);
    setInput(initialFormVals);
  }

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value});
  }

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setDisableSubmit(true);
    
    const res = await fetch(`${API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log(data);

    props.setEventsData(() => {
      return [...props.eventsData, data.event];
    })
    // setSelectedEvent(data.event);
    setInput(initialFormVals);
    setDisableSubmit(false);
    props.setShowEventForm(false);

  }

  const modalBGClasses = ['event-form-modal-bg', props.showEventForm ? 'modal-open' : 'modal-closed'].join(' ');
  const modalFormClasses = ['event-form-container', props.showEventForm ? 'modal-open' : 'modal-closed'].join(' ');

  return (
    <>
      <div className={modalBGClasses} onClick={handleCancel}></div>
      <div className={modalFormClasses}>
        <div className='event-form-heading'>
          <h2 className='event-form-header'>New Game</h2>
        </div>
        <form className='event-form' onSubmit={handleSubmitEvent}>
          <label for='title' className={input.title || 'placeholder-hidden'}>title (required)</label>
          <input autoFocus type='text' name='title' placeholder='title' value={input.title} onChange={handleInputChange} className='title' />
        
          <label for='details' className={input.details || 'placeholder-hidden'}>details</label>
          <input type='text' name='details' placeholder='details' value={input.details} onChange={handleInputChange} className='details' />
        
          <label for='eventDate' className={input.eventDate || 'placeholder-hidden'}>game date</label>
          <input type='date' min='2020-01-01' name='eventDate' placeholder='game date' value={input.eventDate} onChange={handleInputChange} className='eventDate' />
        
          {/* <label for='eventTime' className={input.eventTime || 'placeholder-hidden'}>game time</label>
          <input type='time' min='2020-01-01' name='eventTime' placeholder='game time' value={input.eventTime} onChange={handleInputChange} className='eventTime' /> */}
        
          <label for='location' className={input.location || 'placeholder-hidden'}>location</label>
          <input type='text' name='location' placeholder='location' value={input.location} onChange={handleInputChange} className='location' />
          
          <label for='sport' className={input.sport || 'placeholder-hidden'}>sport (required)</label>
          <input type='text' name='sport' placeholder='sport' value={input.sport} onChange={handleInputChange} className='sport' />
          
          <label for='skillLevel' className={input.skillLevel || 'placeholder-hidden'}>skill level</label>
          <select name='skillLevel' id='skillLevel' value={input.skillLevel} onChange={handleInputChange} className='skillLevel' >
            <option value='Any'>Any</option>
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
          </select>

          <div className='button-container'>
            <button type='submit' disabled={disableSubmit}>Submit</button>
            <button className='form-toggle-btn' type='button' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewEventForm;