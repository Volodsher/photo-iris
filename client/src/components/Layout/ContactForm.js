import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from './MyButton/MyButton';
import Form from 'react-bootstrap/Form';

const initialValues = {
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  session: '',
  textMesage: '',
};

function ContactForm(props) {
  const [message, setMessage] = useState(initialValues);

  // const [session, setSession] = useState('Family');
  // const [guestName, setGuestName] = useState('tttt');
  // const [guestEmail, setGuestEmail] = useState('');
  // const [questPhone, setGuestPhone] = useState('');
  // const [message, setMessage] = useState('');

  // const handleChange = (event) => setMessage(event.target.value);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage({
      ...message,
      [name]: value,
    });
    console.log(message);
  };

  return (
    <form
      id="contactForm"
      className="form"
      style={{
        textAlign: 'left',
      }}
      onSubmit={() => console.log('hello')}
    >
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Choose a session:
        <Form.Select
          name="session"
          value={message.session}
          onChange={handleChange}
          style={{ margin: '0.5rem 0' }}
        >
          <option>Family</option>
          <option>Children</option>
          <option>Portrait</option>
          <option>Business</option>
          <option>Pets</option>
          <option>Beautiful moments</option>
          <option>Other</option>
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
          value={message.questPhone}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
        />
      </label>
      <label className="mb-3" style={{ display: 'block', marginTop: '1.5rem' }}>
        Message: *
        <textarea
          name="textMesage"
          cols="30"
          rows="10"
          placeholder="Write a message"
          value={message.textMesage}
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
