import React, { useEffect, useState } from 'react';
import WordItem from './WordItem';
import Preloader from './layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWords, removeOriginalWords } from '../actions/wordActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import M from 'materialize-css/dist/js/materialize.min.js';

const Words = ({
  word: { words, loading, filtered },
  auth,
  getWords,
  removeOriginalWords
}) => {
  const getData = async () => {
    await getWords();
    await removeOriginalWords();
  };

  const [noWordsWarningDisplayed, setNoWordsWarningDisplayed] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const messageNoWords = () => {
    if (noWordsWarningDisplayed) return;
    //console.log(auth.user);
    if (auth.user === null || auth.user === undefined) return;
    // sometimes(in particular, on screen refresh) auth.user gets null maybe from sync issue
    // that's why localStorage.userid is used here.
    //if (localStorage.userid === null || localStorage.userid === undefined)
    //return;

    if (words === null || words.length === 0) {
      setNoWordsWarningDisplayed(true);
      M.toast({ html: 'No vocabularies of your own.' });
      setTimeout(() => {
        M.toast({
          html: 'You can add vocabularies by your own, or copy from freinds.',
          displayLength: 10000
        });
      }, 4000);
    }
  };

  if (
    loading ||
    //(localStorage.userid && auth.user === null) ||
    words === null
  ) {
    return <Preloader />;
  }

  messageNoWords();

  const wordsForHere = filtered ? filtered : words;
  //console.log('AFTER: ', wordsForHere);
  // const wordsForHere = words;

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
  getWords: PropTypes.func.isRequired,
  removeOriginalWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word,
  auth: state.auth
});

export default connect(mapStateToProps, { getWords, removeOriginalWords })(
  Words
);
