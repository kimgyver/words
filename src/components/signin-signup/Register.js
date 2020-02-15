import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = ({ register }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      M.toast({ html: 'Please enter all fields' });
      //setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
      //setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <p className='info-register'>I do not have an account</p>
      <h4>Register</h4>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
        <div
          style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'grey',
            backgroundColor: '#f8f8f9',
            color: 'rgba(0,0,0,.87)',
            borderRadius: '.28571429rem',
            padding: '0 0.6rem',
            margin: '1rem 0rem',
            maxWidth: '20rem',
            fontSize: '14px'
          }}
        >
          <p>
            Just for browsing, you can log in with below ID and password without
            registration.
          </p>
          <ul style={{ listStyleType: 'circle', listStylePosition: 'inside' }}>
            <li style={{ margin: '0 1.5rem' }}>
              * ID: <b>justuser@words.com</b>
            </li>
            <li style={{ margin: '0 1.5rem' }}>
              * Password: <b>123456</b>
            </li>
          </ul>
          <p>
            Anyway, registration is suggested.
            <br /> It's super easy!
          </p>
        </div>
      </form>
    </div>
  );
};

export default connect(null, {
  register
})(Register);
