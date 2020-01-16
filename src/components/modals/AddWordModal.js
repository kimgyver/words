import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWord } from '../../actions/wordActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddWordModal = ({ addWord }) => {
  const [text, setText] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [examples, setExamples] = useState([]);

  const onSubmit = () => {
    if (text === '') {
      M.toast({ html: 'Please enter a word' });
    } else {
      const newWord = {
        text,
        definition,
        synonyms,
        examples,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      addWord(newWord);

      M.toast({ html: `Word added}` });

      // Clear Fields
      setText('');
      setDefinition('');
      setSynonyms('');
      setExamples([]);
    }
  };

  return (
    <div id='add-word-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter Word</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='text'
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor='text' className='active'>
              Word
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='definition'
              value={definition}
              onChange={e => setDefinition(e.target.value)}
            />
            <label htmlFor='definition' className='active'>
              Definition
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='synonyms'
              value={synonyms}
              onChange={e => setSynonyms(e.target.value)}
            />
            <label htmlFor='synonyms' className='active'>
              Synonyms
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input type='checkbox' className='filled-in' />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>

        <div className='modal-footer'>
          <a
            href='#!'
            onClick={onSubmit}
            className='modal-close waves-effect blue waves-light btn'
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

AddWordModal.propTypes = {
  addWord: PropTypes.func.isRequired
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(null, { addWord })(AddWordModal);
