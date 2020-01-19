import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  filterWords,
  clearFilter,
  toggleColumnNumber
} from '../../actions/wordActions';

const SearchBar = ({ filterWords, clearFilter, toggleColumnNumber }) => {
  const text = useRef('');

  const onChange = e => {
    //filterWords(e.target.value);
    filterWords(text.current.value);
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
              href='#!'
              onClick={() => {
                resetSearchBar();
                clearFilter();
              }}
            >
              <i className='material-icons' style={iconStyle}>
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
