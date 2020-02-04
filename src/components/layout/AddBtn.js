import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AddBtn = ({ isAuthenticated, history }) => {
  return (
    <div className='fixed-action-btn'>
      <a
        href='#add-word-modal'
        onClick={() => {
          if (!isAuthenticated) {
            history.push('/signin');
          }
        }}
        className='btn-floating btn-large blue darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
      {/* <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating green modal-trigger'
          >
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li>
          <a href='#add-tech-modal' className='btn-floating red modal-trigger'>
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul> */}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, null)(AddBtn));
