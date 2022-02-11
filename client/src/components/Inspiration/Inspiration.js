// import { useState, useEffect } from 'react';
import './Inspiration.module.scss';
import HamburgerButton from '../HamburgerButton/HamburgerButton';

export default function Inspiration() {
  return (
    <div>
      this is Inspiration
      <HamburgerButton menuOpen={false} style={{display: 'block'}} />
    </div>
  )
}