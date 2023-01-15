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
  session: 'Family',
  textMessage: '',
};

function ContactForm(props) {
  const [message, setMessage] = useState(initialValues);

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
        console.log(res);
        alert(res.data);
      } catch (error) {
        alert(error.message);
      }
    };

    sendMessage(message);
    console.log(message);

    setMessage({
      ...message,
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      session: 'Family',
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
          <option value="Family">Family</option>
          <option value="Children">Children</option>
          <option value="Portrait">Portrait</option>
          <option value="Business">Business</option>
          <option value="Pets">Pets</option>
          <option value="Beautiful moments">Beautiful moments</option>
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
