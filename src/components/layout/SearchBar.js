import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  filterWords,
  clearFilter,
  toggleColumnNumber
} from '../../actions/wordActions';
import { getUsers, logout, loadUser } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import './SearchBar.scss';

const SearchBar = ({
  filterWords,
  clearFilter,
  toggleColumnNumber,
  isAuthenticated,
  logout,
  loadUser,
  getUsers,
  words
}) => {
  const text = useRef('');

  useEffect(() => {
    showHideClearButton();
    loadUser();
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    //filterWords(e.target.value);
    filterWords(text.current.value);
    showHideClearButton();
  };

  const onLogout = () => {
    logout();
    //contactContext.clearContacts();
    window.location.reload();
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

  const getUserDisplayName = () => {
    const uname = localStorage.username;
    if (uname === null || uname === undefined) return '';
    const wordSplit = uname.split(' ');
    const wordCount = wordSplit.length;
    let result = '';
    if (wordCount === 1) {
      result = uname[0].toUpperCase() + uname.slice(1, 2);
    } else if (wordCount >= 2) {
      const fname = wordSplit[0];
      const lname = wordSplit[wordCount - 1];
      result = fname[0].toUpperCase() + lname[0].toUpperCase();
    }
    return result;
  };

  const readUserSetting = () => {
    getUsers();
    loadUser();
  };

  const wordsCountOfMine = () => {
    if (!words) return 0;

    return words.reduce(
      (acc, word) =>
        acc + (word.owner && word.owner._id === localStorage.userid ? 1 : 0),
      0
    );
  };

  // console.log(words);
  return (
    <nav>
      <div
        className='nav-wrapper grey'
        style={{ display: 'grid', gridTemplateColumns: '20fr 2fr 2fr 2fr' }}
      >
        <form>
          <div
            className='input-field'
            style={{ display: 'flex', flexDirection: 'row' }}
          >
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
                height: '4.5rem',
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
            <i className='material-icons icon-btn' style={iconStyle}>
              sync_alt
            </i>
          </a>
        </div>

        {/* Setting Button */}
        <div>
          <a
            href='#setting-modal'
            onClick={() => readUserSetting()}
            className='modal-trigger'
          >
            <i className='material-icons icon-btn' style={iconStyle}>
              reorder
            </i>
          </a>
        </div>

        {/* Sign in / User Name / Sign out */}
        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <span className='user-name'>
                {getUserDisplayName()}
                <br />
                <div style={{ display: 'flex', fontSize: '0.8rem' }}>
                  {words && wordsCountOfMine()}
                  <div style={{ fontSize: '0.7rem' }}>
                    {' '}
                    {words &&
                      (words.length === wordsCountOfMine()
                        ? 'words'
                        : `w+${words.length - wordsCountOfMine()}w`)}
                  </div>
                </div>
              </span>

              <div>
                <a onClick={onLogout} href='#!'>
                  <i
                    className='material-icons icon-btn'
                    style={iconStyle}
                    title='Logout'
                  >
                    exit_to_app
                  </i>
                </a>
              </div>
            </div>
          ) : (
            <Link to='/signin'>
              <i
                className='material-icons icon-btn'
                style={iconStyle}
                title='Login'
              >
                power_settings_new
              </i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const iconStyle = { padding: '0 1rem 0 1rem' };

const mapStateToProps = state => ({
  words: state.word.words,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  filterWords,
  clearFilter,
  toggleColumnNumber,
  logout,
  loadUser,
  getUsers
})(SearchBar);
