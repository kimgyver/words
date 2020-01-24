import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  filterWords,
  clearFilter,
  toggleColumnNumber
} from '../../actions/wordActions';

import './SearchBar.scss';

const SearchBar = ({ filterWords, clearFilter, toggleColumnNumber }) => {
  const text = useRef('');

  useEffect(() => {
    showHideClearButton();
  }, []);

  const onChange = e => {
    //filterWords(e.target.value);
    filterWords(text.current.value);
    showHideClearButton();
  };

  const showHideClearButton = () => {
    const x_window = document.querySelector('.clear-x-button1');
    if (text.current.value === '') {
      x_window.style.display = 'none';
    } else {
      x_window.style.display = 'block';
    }
  };

  const resetSearchBar = () => {
    //document.querySelector('#search').value = '';
    text.current.value = '';
  };

  return (
    <nav>
      <div
        className='nav-wrapper grey'
        style={{ display: 'grid', gridTemplateColumns: '25fr 1fr 1fr' }}
      >
        <form>
          <div className='input-field' style={{ display: 'flex' }}>
            {/* Search Icon */}
            <i className='material-icons' style={iconStyle}>
              search
            </i>

            {/* Search Input */}
            <input
              id='search'
              type='search'
              ref={text}
              onChange={onChange}
              placeholder='Search Words...'
              className='searchBarInput'
              style={{
                paddingLeft: window.innerWidth > 500 ? '3rem' : '1rem',
                width:
                  window.innerWidth > 500
                    ? 'calc(100% - 3rem)'
                    : 'calc(100% - 1rem)'
              }}
            />

            {/* X Button */}
            <a
              className='clear-x-button'
              href='#!'
              onClick={() => {
                resetSearchBar();
                clearFilter();
                showHideClearButton();
              }}
            >
              <i className='material-icons clear-x-button1' style={iconStyle}>
                close
              </i>
            </a>
          </div>
        </form>

        {/* Toggle column count Button */}
        {/* disable on mobile -> css */}
        <div className='toggle-colomn-count'>
          <a href='#!' onClick={toggleColumnNumber}>
            <i className='material-icons' style={iconStyle}>
              sync_alt
            </i>
          </a>
        </div>

        {/* Setting Button */}
        <div>
          <a href='#setting-modal' className='modal-trigger'>
            <i className='material-icons' style={iconStyle}>
              reorder
            </i>
          </a>
        </div>
      </div>
    </nav>
  );
};

const iconStyle = { padding: '0 1rem 0 1rem' };

export default connect(null, {
  filterWords,
  clearFilter,
  toggleColumnNumber
})(SearchBar);
