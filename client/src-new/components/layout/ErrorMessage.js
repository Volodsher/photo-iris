import React from 'react';

export default function ({ errMessage }) {
  return (
    <div>
      <p style={{ backgroundColor: 'var(--red-light)', color: 'white' }}>
        {errMessage}
      </p>
    </div>
  );
}
