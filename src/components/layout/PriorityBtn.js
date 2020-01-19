import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateWord } from '../../actions/wordActions';

const PriorityBtn = ({ word, setPriorityChanageble, updateWord }) => {
  const priorityColor = ['orange', 'blue', 'yellow'];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div></div>
      <div
        style={{
          display: 'flex'
        }}
      >
        {Array.from(Array(3), (e, i) => {
          return (
            <div key={i}>
              <a
                href='#!'
                onClick={() => {
                  word.priority = i + 1;
                  updateWord(word);
                  setPriorityChanageble(false);
                }}
                style={{
                  backgroundColor: priorityColor[i],
                  display: 'inline-block',
                  border: word.priority === i + 1 ? '0.2rem solid red' : '0px',
                  padding:
                    word.priority === i + 1
                      ? '0 0.5rem 0 0.5rem'
                      : '0.2rem 0.7rem 0.2rem 0.7rem',
                  margin: '0.1rem 0.2rem 0.1rem 0.2rem'
                }}
              >
                {word.priority === i + 1 ? <b>{i + 1}</b> : i + 1}
              </a>
              &nbsp;
            </div>
          );
        })}
      </div>
    </div>
  );
};

PriorityBtn.propTypes = {
  updateWord: PropTypes.func.isRequired
};

export default connect(null, { updateWord })(PriorityBtn);
