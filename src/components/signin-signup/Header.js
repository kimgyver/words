import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <img src='/images/logo.png' alt='' width='50%' className='logo' />
    </Link>
  </div>
);

export default Header;
