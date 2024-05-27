import React, { useState, useEffect, Fragment } from 'react';
import ContactForm from '../layout/ContactForm';

export default function Contact() {
  return (
    <Fragment>
      <section
        style={{
          textAlign: 'left',
          width: '70vw',
          margin: '1rem auto',
          borderBottom: '1px solid black',
        }}
      >
        <p>Located in Ottawa, Canada</p>
      </section>
      <section style={{ width: '70vw', margin: '1rem auto' }}>
        <ContactForm session="Family" />
      </section>
    </Fragment>
  );
}
