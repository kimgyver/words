import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWord } from '../../actions/wordActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddWordModal = ({ addWord }) => {
  const [text, setText] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [priority, setPriority] = useState('3');
  const [examples, setExamples] = useState([]);

  const onSubmit = () => {
    if (text === '') {
      M.toast({ html: 'Please enter a word to add...' });
    } else if (priority === '') {
      M.toast({ html: 'Please enter priority.' });
    } else {
      const newWord = {
        text,
        definition,
        synonyms,
        examples: finalizeExamples(),
        priority,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      addWord(newWord);

      M.toast({ html: `Word added... '${text}'` });

      // Clear Fields
      setText('');
      setDefinition('');
      setSynonyms('');
      //setExamples([]);
      setExamples(['', '', '']);
      setPriority('3');
    }
  };

  const finalizeExamples = () => {
    const finalExamples = examples.filter(
      example => example !== undefined && example.trim() !== ''
    );
    return finalExamples;
  };

  const updateExamplesChanged = index => e => {
    let arr = [...examples]; // copying the old datas array
    arr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
    // console.log('Result:', arr);
    setExamples(arr);
  };

  const onClose = () => {
    setText('');
    setDefinition('');
    setSynonyms('');
    //setExamples([]);
    setExamples(['', '', '']);
    setPriority('3');
  };

  return (
    <div id='add-word-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Add Word</h4>
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

        <div
          className='row'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className='input-field col s12'>
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
          <div>
            <label htmlFor='priority' className='active'>
              Priority
            </label>
            <select
              name='priority'
              value={priority}
              className='browser-default'
              onChange={e => setPriority(e.target.value)}
            >
              <option value='' disabled>
                Select Priority
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </div>
        </div>

        {Array.from(Array(3), (e, i) => {
          return (
            <div className='row' key={i}>
              <div className='input-field'>
                <input
                  type='text'
                  name='examples'
                  value={examples[i]}
                  onChange={updateExamplesChanged(i)}
                />
                <label htmlFor='exmples' className='active'>
                  Example {i + 1}
                </label>
              </div>
            </div>
          );
        })}

        <div className='modal-footer'>
          <a
            href='#!'
            onClick={onSubmit}
            className='modal-close waves-effect blue waves-light btn'
          >
            Enter
          </a>{' '}
          <a
            href='#!'
            onClick={onClose}
            className='modal-close waves-effect grey waves-light btn'
          >
            Close
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
