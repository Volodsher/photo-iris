import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyButton from './MyButton/MyButton';
import Form from 'react-bootstrap/Form';
import styles from './Layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const initialMessage = {
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  session: '',
  textMessage: '',
};

function ContactForm({ session, handleClick, handleCancel, xmark }) {
  const [message, setMessage] = useState({
    ...initialMessage,
    session: session,
  });
  const [errors, setErrors] = useState({ ...initialMessage });
  const [checked, setChecked] = useState(false);

  const validate = (fieldValues = message) => {
    let newErrors = { ...errors };

    if ('guestName' in fieldValues) {
      newErrors.guestName = fieldValues.guestName
        ? ''
        : 'This field is required';
    }

    if ('guestEmail' in fieldValues) {
      newErrors.guestEmail = fieldValues.guestEmail
        ? ''
        : 'This field is required';
      if (fieldValues.guestEmail)
        newErrors.guestEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
          fieldValues.guestEmail
        )
          ? ''
          : 'Email is not valid.';
    }

    if ('guestPhone' in fieldValues) {
      newErrors.guestPhone = '';
    }

    if ('textMessage' in fieldValues)
      newErrors.textMessage =
        fieldValues.textMessage.length !== 0 ? '' : 'This field is required';

    setErrors({
      ...newErrors,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage({
      ...message,
      [name]: value,
    });

    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setMessage({
      ...initialMessage,
    });
  };

  const formIsValid = (fieldValues = message) => {
    const isValid =
      fieldValues.guestName &&
      fieldValues.guestEmail &&
      fieldValues.textMessage &&
      Object.values(errors).every((error) => error === '');

    return isValid;
  };

  const handleAgreement = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validate();
    const isValid =
      Object.values(errors).every((error) => error === '') && formIsValid();

    const sendMessage = async (payload) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await axios.post('/api/mail', payload, config);
        alert(res.data);

        setMessage({
          ...message,
          guestName: '',
          guestEmail: '',
          guestPhone: '',
          session: 'Family Fun',
          textMessage: '',
        });

        setChecked(false);
        handleClick && handleClick();
      } catch (error) {
        error.response.data.errors.map((er) =>
          setErrors({ ...errors, [er.param]: er.msg })
        );
        alert(error.response.data.errors.map((al) => al.msg));
        // alert(error.message);
        // handleClick && handleClick();
      }
    };

    if (isValid) {
      sendMessage(message);
    }
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
      {xmark && (
        <button
          onClick={handleCancel}
          type="button"
          style={{
            display: 'block',
            margin: '0',

            lineHeight: '0',
            padding: '0 5px',
            boxShadow: 'none',
            float: 'right',
          }}
        >
          <FontAwesomeIcon color="gray" icon={faXmark} size="xl" />
        </button>
      )}

      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Choose a session:
        <Form.Select
          name="session"
          value={message.session}
          onChange={handleChange}
          style={{ margin: '0.5rem 0', borderRadius: '0', width: '100%' }}
        >
          <option value="Family Fun">Family Fun</option>
          <option value="Kids' Adventures">Kids' Celebrations</option>
          <option value="Love Story">Love Story</option>
          <option value="Maternity">Maternity</option>
          <option value="Portrait">Portrait</option>
          <option value="Mini Session">Mini Session</option>
          <option value="Smile and Paws">Smile and Paws</option>
          <option value="Business">Business</option>
          <option value="Wedding">Wedding</option>
          <option value="Food Photography">Food Photography</option>
          <option value="Pet Photography">Pet Photography</option>
          <option value="Other">Other</option>
        </Form.Select>
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Name: *{' '}
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
          // required
        />
        {errors.guestName && (
          <span style={{ color: 'red' }}>Name is required</span>
        )}
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Email: *{' '}
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
          // required
        />
        {errors.guestEmail && (
          <span style={{ color: 'red' }}>Email is required</span>
        )}
      </label>
      <label style={{ display: 'block', marginTop: '1.5rem' }}>
        Your Phone:{' '}
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
        {errors.guestPhone && (
          <span style={{ color: 'red' }}>Only numbers</span>
        )}
      </label>
      <label className="mb-3" style={{ display: 'block', marginTop: '1.5rem' }}>
        Message: *{' '}
        <textarea
          name="textMessage"
          // cols="30"
          rows="3"
          placeholder="Write a message"
          value={message.textMessage}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          required
        />
        {errors.textMessage && (
          <span style={{ color: 'red' }}>Text is required</span>
        )}
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleAgreement}
            style={{
              width: '1rem',
              height: '1rem',
              marginRight: '1rem',
            }}
            required
          />
          By submitting my contact information through the contact form on this
          website, I agree to share my information with the website owner for
          the purpose of communication regarding my inquiry.
        </label>
      </div>

      {(errors.guestName !== '' ||
        errors.guestEmail !== '' ||
        errors.guestPhone !== '' ||
        errors.textMessage !== '') && (
        <p style={{ color: 'red' }}> Check the form</p>
      )}

      <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0' }}>
        <MyButton
          className={styles.contactButton}
          type="submit"
          value="Send a message"
          borderColor="--gray-light"
          form="contactForm"
        />
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  session: PropTypes.string,
  handleClick: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default ContactForm;
