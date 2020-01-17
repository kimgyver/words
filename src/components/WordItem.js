import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrent } from '../actions/wordActions';
import PriorityBtn from './layout/PriorityBtn';

// import V from './voicerss-tts.min.js';

const WordItem = ({ word, setCurrent }) => {
  //   const tts = text => {
  //     V.VoiceRSS.speech({
  //       key: '2c13f968d9cb41cda2f4095c9a22048b',
  //       src: text,
  //       hl: 'en-gb',
  //       r: 0,
  //       c: 'mp3',
  //       f: '44khz_16bit_stereo',
  //       ssml: false
  //     });
  //   };

  //   const textIt = window => {
  //     //   const prevSibling = window.parentNode.childNodes[0];
  //     const prevSibling = window.previousSibling;
  //     const text = prevSibling.textContent.replace(/(\r\n|\n|\r)/gm, ' ');
  //     tts(text);
  //   };

  let bgClass = 'card ';
  let fontClass = 'card-content ';
  switch (word.priority) {
    case 1:
      bgClass += 'orange';
      fontClass += 'white-text';
      break;
    case 2:
      bgClass += 'blue-grey';
      fontClass += 'white-text';
      break;
    case 3:
      bgClass += 'yellow';
      fontClass += 'black-text';
      break;
    default:
      break;
  }
  bgClass += ' darken-1';

  return (
    <div className='col s12 m4'>
      <div className={bgClass}>
        <div className={fontClass}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className='card-title'>
              {word.text}{' '}
              <a href='#!' onClick={() => window.tts(word.text)}>
                <i className='tiny material-icons'>play_circle_outline</i>
              </a>
            </span>

            <div>
              <a
                href='#edit-word-modal'
                className='modal-trigger'
                onClick={() => setCurrent(word)}
              >
                <i className='small material-icons'>edit</i>
              </a>

              {/* <PriorityBtn /> */}
              <i className='small material-icons'>swap_vertical_circle</i>
              <a
                href='#delete-word-modal'
                className='modal-trigger'
                onClick={() => setCurrent(word)}
              >
                <i className='small material-icons'>clear</i>
              </a>
            </div>
          </div>

          <div>
            {word.definition}
            <br></br>
            {word.synonyms && (
              <div>
                = <u>{word.synonyms}</u>{' '}
                <a href='#!' onClick={() => window.tts(word.synonyms)}>
                  <i className='tiny material-icons'>play_circle_outline</i>
                </a>
              </div>
            )}
          </div>

          {word.examples.map((ex, i) => (
            <li key={i}>
              <i>
                {ex} {}
                <a href='#!' onClick={() => window.tts(ex)}>
                  <i className='tiny material-icons'>play_circle_outline</i>
                </a>
              </i>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { setCurrent })(WordItem);
