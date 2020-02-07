import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = ({ login }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (email === '' || password === '') {
      //setAlert('Please fill in all fields', 'danger');
      M.toast({ html: 'Please fill in all fields' });
    } else {
      //console.log(email, password);
      await login({
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <p className='info-login'>I already has an account</p>
      <h4>Login</h4>
      <form onSubmit={onSubmit}>
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
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, {
  login
})(Login);
