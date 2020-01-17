import React from 'react';

const PriorityBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a
        href='#!'
        className='btn-floating btn-large blue darken-2 modal-trigger'
      >
        <i className='small material-icons'>person</i>
      </a>
      <ul>
        <li>
          <a href='#!' className='btn-floating green modal-trigger'>
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li>
          <a href='#!' className='btn-floating red modal-trigger'>
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PriorityBtn;
