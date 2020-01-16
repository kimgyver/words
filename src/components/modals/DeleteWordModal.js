import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteWord } from '../../actions/wordActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteWordModal = ({ current, deleteWord }) => {
  const [textWord, setTextWord] = useState('');

  const onSubmit = () => {
    console.log(current);
    if (textWord === '') {
      M.toast({
        html: 'Please exactly enter the word to be deleted.'
      });
    } else if (textWord !== current.text) {
      //M.toast({ html: 'Please enter exact word to be deleted' });
      M.toast({
        html: 'Please exactly enter the word to be deleted.'
      });
      setTextWord('');
    } else {
      // console.log(message, attention, tech);

      deleteWord(current._id);

      M.toast({ html: 'Word deleted' });

      // Clear Fields
      setTextWord('');
    }
  };

  return (
    <div id='delete-word-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Delete word </h4>
        <h5>
          Correctly enter word to remove: "{current != null ? current.text : ''}
          "
        </h5>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='textWord'
              value={textWord}
              onChange={e => setTextWord(e.target.value)}
            />
            <label htmlFor='text' className='active'>
              Input word
            </label>
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

DeleteWordModal.propTypes = {
  current: PropTypes.object,
  deleteWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.word.current
});

const modalStyle = {
  width: '50%',
  height: '50%'
};

export default connect(mapStateToProps, { deleteWord })(DeleteWordModal);
