import React from 'react';
import './SignInAndSignUpPage.scss';
import Login from './Login';
import Register from './Register';
import Header from './Header';

const SignInAndSignUpPage = () => (
  <div>
    <Header />
    <div className='sign-in-and-sign-up'>
      <Login />
      <Register />
    </div>
  </div>
);

export default SignInAndSignUpPage;
