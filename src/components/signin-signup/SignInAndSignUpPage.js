import React, { useEffect } from 'react';
import './SignInAndSignUpPage.scss';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const SignInAndSignUpPage = ({
  error,
  clearErrors,
  isAuthenticated,
  history
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      //setAlert(error, 'danger');
      M.toast({ html: error });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  return (
    <div>
      <Header />
      <div className='sign-in-and-sign-up'>
        <Login />
        <Register />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps, {
    clearErrors
  })(SignInAndSignUpPage)
);
