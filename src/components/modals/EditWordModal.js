import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateWord } from '../../actions/wordActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditWordModal = ({ current, updateWord }) => {
  const priorityColor = ['orange', 'blue', 'yellow'];

  const [text, setText] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [priority, setPriority] = useState('3');
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    if (current) {
      setText(current.text);
      setDefinition(current.definition);
      setSynonyms(current.synonyms);
      setPriority(current.priority);
      setExamples(current.examples);
    }
  }, [current]);

  const onSubmit = () => {
    if (text === '') {
      M.toast({ html: 'Please enter a word to update...' });
    } else if (priority === '') {
      M.toast({ html: 'Please enter priority.' });
    } else {
      const updatedWord = {
        _id: current._id,
        text,
        definition,
        synonyms,
        examples: finalizeExamples(),
        priority,
        updatedAt: new Date()
      };

      updateWord(updatedWord);

      //M.toast({ html: `Word updated... '${text}'` });

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
    <div id='edit-word-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Edit Word</h4>
        <div className='row'>
          <div>
            <label htmlFor='text' className='active'>
              Word
            </label>
            <input
              type='text'
              name='text'
              value={text}
              onChange={e => setText(e.target.value)}
              // style={{ marginTop: '0.9rem' }}
            />
          </div>
        </div>

        <div className='row'>
          <div>
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
              <div>
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

EditWordModal.propTypes = {
  updateWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.word.current
});

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(mapStateToProps, { updateWord })(EditWordModal);
