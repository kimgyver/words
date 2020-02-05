import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register, clearErrors } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = ({
  register,
  error,
  clearErrors,
  isAuthenticated,
  history
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'User already exists') {
      //setAlert(error, 'danger');
      M.toast({ html: error });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      M.toast({ html: 'Please enter all fields' });
      //setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
      //setAlert('Passwords do not match', 'danger');
    } else {
      await register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h5>I do not have an account</h5>
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
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps, {
    register,
    clearErrors
  })(Register)
);
