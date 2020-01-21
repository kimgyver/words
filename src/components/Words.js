import React, { useEffect } from 'react';
import WordItem from './WordItem';
import Preloader from './layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWords } from '../actions/wordActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Words = ({ word: { words, loading, filtered }, getWords }) => {
  useEffect(() => {
    getWords();
    // eslint-disable-next-line
  }, []);

  if (loading || words == null) {
    return <Preloader />;
  }

  const wordsForHere = filtered ? filtered : words;
  //const wordsForHere = words;

  return (
    <div>
      <div className='row'>
        <TransitionGroup>
          {wordsForHere != null &&
            wordsForHere.map(word => (
              <CSSTransition key={word._id} timeout={500} classNames='item'>
                <WordItem word={word} key={word._id} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

Words.propTypes = {
  word: PropTypes.object.isRequired,
  getWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});

export default connect(mapStateToProps, { getWords })(Words);
