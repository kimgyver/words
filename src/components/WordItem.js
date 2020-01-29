import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrent } from '../actions/wordActions';
import PriorityBtn from './layout/PriorityBtn';

import './WordItem.css';
// import V from './voicerss-tts.min.js';

const WordItem = ({ word, setCurrent, filterString, columnNumber }) => {
  const [priorityChanageble, setPriorityChanageble] = useState(false);
  const playText = useRef();
  const playDefinition = useRef();
  const playExample = useRef([]);

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

  /**
   * Find and highlight relevant keywords within a block of text
   * @param  {string} label - The text to parse
   * @param  {string} value - The search keyword to highlight
   * @return {object} A JSX object containing an array of alternating strings and JSX
   */
  const highlightedText = (text, pattern) => {
    const splitText = text.split(pattern);

    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);

    return splitText.reduce(
      (arr, element, index) =>
        matches[index]
          ? [...arr, element, <mark key={index}>{matches[index]}</mark>]
          : [...arr, element],
      []
    );
  };

  const getClassByColumnNumber = () => {
    switch (columnNumber) {
      case 1:
        return 'm12';
      case 2:
        return 'm6';
      case 3:
        return 'm4';
      case 4:
        return 'm3';
      default:
        return 'm4';
    }
  };

  const iconChangeWhilePlaying = (playRef, delayTime = 1500) => {
    playRef.parentElement.classList.add('disabled');
    playRef.textContent = 'play_circle_filled';
    setTimeout(() => {
      playRef.textContent = 'play_circle_outline';
      playRef.parentElement.classList.remove('disabled');
    }, delayTime);
  };

  return (
    <div className={`col s12 ${getClassByColumnNumber()}`}>
      <div className={bgClass}>
        <div className={fontClass}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* word.text */}
            <span className='card-title'>
              {highlightedText(word.text, filterString)}
              <a
                href='#!'
                onClick={() => {
                  iconChangeWhilePlaying(
                    playText.current,
                    word.text.length * 120
                  );
                  window.tts(word.text);
                }}
              >
                <i className='tiny material-icons' ref={playText}>
                  play_circle_outline
                </i>
              </a>
            </span>

            <div>
              {/* EDIT Button */}
              <a
                href='#edit-word-modal'
                className='modal-trigger'
                onClick={() => setCurrent(word)}
              >
                <i className='small material-icons'>edit</i>
              </a>

              {/* CHANGE PRIORITY Button */}
              <a
                href='#!'
                onClick={() => {
                  setCurrent(word);
                  priorityChanageble
                    ? setPriorityChanageble(false)
                    : setPriorityChanageble(true);
                }}
              >
                <i className='small material-icons'>swap_vertical_circle</i>
              </a>

              {/* DELETE Button */}
              <a
                href='#delete-word-modal'
                className='modal-trigger'
                onClick={() => setCurrent(word)}
              >
                <i className='small material-icons'>clear</i>
              </a>
            </div>
          </div>

          {/* CHANGE PRIORITY 1,2,3 Button */}
          {priorityChanageble ? (
            <PriorityBtn
              word={word}
              setPriorityChanageble={setPriorityChanageble}
            />
          ) : null}

          <div>
            {/* word.definition */}
            {highlightedText(word.definition, filterString)}
            <br></br>
            {/* word.synonyms */}
            {word.synonyms && (
              <div>
                = <u>{word.synonyms}</u>{' '}
                <a
                  href='#!'
                  onClick={() => {
                    iconChangeWhilePlaying(
                      playDefinition.current,
                      word.synonyms.length * 120
                    );
                    window.tts(word.synonyms);
                  }}
                >
                  <i className='tiny material-icons' ref={playDefinition}>
                    play_circle_outline
                  </i>
                </a>
              </div>
            )}
          </div>

          {/* word.examples */}
          {word.examples.map((ex, i) => (
            <li key={i}>
              <i>
                {highlightedText(ex, filterString)}
                <a
                  href='#!'
                  onClick={() => {
                    iconChangeWhilePlaying(
                      playExample.current[i],
                      ex.length * 120
                    );
                    window.tts(ex);
                  }}
                >
                  <i
                    className='tiny material-icons'
                    ref={el => (playExample.current[i] = el)}
                  >
                    play_circle_outline
                  </i>
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
  setCurrent: PropTypes.func.isRequired,
  filterString: PropTypes.string,
  columnNumber: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  filterString: state.word.filterString,
  columnNumber: state.word.columnNumber
});

export default connect(mapStateToProps, { setCurrent })(WordItem);
