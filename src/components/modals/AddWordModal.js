import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addWord,
  clearDictionary,
  selectCandidatesDictionary
} from '../../actions/wordActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddWordModal = ({
  addWord,
  dictionaries,
  selectCandidatesDictionary,
  clearDictionary
}) => {
  const priorityColor = ['orange', 'blue', 'yellow'];

  const [text, setText] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [priority, setPriority] = useState('3');
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    if (dictionaries !== null && dictionaries !== undefined) {
      let dicDefinition = dictionaries.options.map(o => o.definition);
      dicDefinition = dicDefinition.join(', ');
      setDefinition(dicDefinition);

      let dicSynoyms = dictionaries.options.map(o =>
        o.synonyms ? o.synonyms.join(', ') : null
      );
      dicSynoyms = dicSynoyms.join(', ');
      setSynonyms(dicSynoyms);

      let dicExamples = [];
      dictionaries.options.map(o =>
        o.examples ? dicExamples.push(o.examples) : null
      );
      dicExamples = dicExamples.flat(2);
      dicExamples = dicExamples.slice(0, 3);

      // console.log(dicExamples);

      setExamples(dicExamples);

      // clearDictionary();
    }
  }, [dictionaries]);

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

  const setSearchWord = () => {
    let wi = document.querySelector('#searching-word');
    wi.value = text;

    // search from dictionary
    selectCandidatesDictionary(text);
  };

  return (
    <div id='add-word-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <div
          className='col s12'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div>
            <h4>Add Word</h4>
          </div>
          <div>
            {text.length > 2 && (
              <a
                href='#select-dictionary-modal'
                onClick={setSearchWord}
                className='modal-trigger'
              >
                <i className='small material-icons'>import_contacts</i> LOOKUP
                DICTIONARY
              </a>
            )}
          </div>
          <div></div>
          <div></div>
        </div>
        <div className='row'>
          <label htmlFor='text' className='active'>
            Word
          </label>
          <input
            type='text'
            name='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>

        <div className='row'>
          <label htmlFor='definition' className='active'>
            Definition
          </label>
          <input
            type='text'
            name='definition'
            value={definition}
            onChange={e => setDefinition(e.target.value)}
          />
        </div>

        <div
          className='row'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className='col s12'>
            <label htmlFor='synonyms' className='active'>
              Synonyms
            </label>
            <input
              type='text'
              name='synonyms'
              value={synonyms}
              onChange={e => setSynonyms(e.target.value)}
            />
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
          <div
            style={{
              backgroundColor: priorityColor[priority - 1],
              display: 'inline-block',
              border: '0px',
              padding: '0.2rem 0.4rem',
              margin: '1.5rem 0.2rem 1.2rem 0.2rem'
            }}
          >
            &nbsp;
          </div>
        </div>

        {Array.from(Array(3), (e, i) => {
          return (
            <div className='row' key={i}>
              <label htmlFor='exmples' className='active'>
                Example {i + 1}
              </label>
              <input
                type='text'
                name='examples'
                value={examples[i]}
                onChange={updateExamplesChanged(i)}
              />
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

const mapStateToProps = state => ({
  dictionaries: state.word.dictionaries
});

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(mapStateToProps, {
  addWord,
  selectCandidatesDictionary,
  clearDictionary
})(AddWordModal);
