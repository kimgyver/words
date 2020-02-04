import React from 'react';
import './SignInAndSignUpPage.scss';
import Login from './Login';
import Register from './Register';

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <Login />
    <Register />
  </div>
);

export default SignInAndSignUpPage;
