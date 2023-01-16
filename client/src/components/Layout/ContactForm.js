import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyButton from './MyButton/MyButton';
import Form from 'react-bootstrap/Form';

const initialValues = {
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  session: '',
  textMessage: '',
};

function ContactForm(props) {
  const [message, setMessage] = useState({
    ...initialValues,
    session: props.session,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage({
      ...message,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sendMessage = async (payload) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await axios.post('/api/mail', payload, config);
        alert(res.data);
        props.handleClick();
      } catch (error) {
        alert(error.message);
        props.handleClick();
      }
    };

    sendMessage(message);

    setMessage({
      ...message,
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      session: 'Family Fun',
      textMessage: '',
    });
  };

  return (
    <form
      id="contactForm"
      className="form"
      style={{
        textAlign: 'left',
      }}
      onSubmit={handleSubmit}
    >
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Choose a session:
        <Form.Select
          name="session"
          value={message.session}
          onChange={handleChange}
          style={{ margin: '0.5rem 0' }}
        >
          <option value="Family Fun">Family Fun</option>
          <option value="Kids' Celebrations">Kids' Celebrations</option>
          <option value="Love Story">Love Story</option>
          <option value="Maternity">Maternity</option>
          <option value="Portrait">Portrait</option>
          <option value="Mini Session">Mini Session</option>
          <option value="Smile and Paws">Smile and Paws</option>
          <option value="Business">Business</option>
          <option value="Wedding">Wedding</option>
          <option value="Other">Other</option>
        </Form.Select>
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Name: *
        <input
          name="guestName"
          value={message.guestName}
          cols="30"
          rows="5"
          type="text"
          placeholder="name"
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          required
        />
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Email: *
        <input
          name="guestEmail"
          cols="30"
          rows="5"
          type="text"
          placeholder="email"
          value={message.guestEmail}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          required
        />
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Phone:
        <input
          name="guestPhone"
          cols="30"
          rows="5"
          type="text"
          placeholder="phone number"
          value={message.guestPhone}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
        />
      </label>
      <label className="mb-3" style={{ display: 'block', marginTop: '1.5rem' }}>
        Message: *
        <textarea
          name="textMessage"
          cols="30"
          rows="10"
          placeholder="Write a message"
          value={message.textMessage}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          required
        />
      </label>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <MyButton
          type="submit"
          value="Send a message"
          borderColor="--gray-light"
          form="contactForm"
        />
      </div>
    </form>
  );
}

ContactForm.propTypes = {};

export default ContactForm;
