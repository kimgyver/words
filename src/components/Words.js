import React, { useState, useEffect } from 'react';
import WordItem from './WordItem';
import Preloader from './layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWords } from '../actions/wordActions';

const Words = ({ word: { words, loading }, getWords }) => {
  // const [words, setWords] = useState();

  useEffect(() => {
    // fetch('http://localhost:5000/api/words')
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json);
    //     setWords(json);
    //   });

    getWords();
  }, []);

  // useEffect(() => {
  //   setWords([
  //     {
  //       text: '1swimming',
  //       _id: '5e1e4c5258c4f41ce46eba27',
  //       definition:
  //         'the sport or activity of propelling oneself through water using the limbs',
  //       synonyms: 'bathing, swim',
  //       examples: [
  //         'Rachel had always loved swimming',
  //         'The Russians were able to swim their infantry carriers across',
  //         'Or do you want to go out and swim during SWIMMING?'
  //       ],
  //       priority: 1,
  //       createdAt: { $date: '2020-01-12T14:00:00.000+00:00' },
  //       updatedAt: { $date: '2020-01-12T14:00:00.000+00:00' }
  //     },
  //     {
  //       text: '2reinstate',
  //       definition: '(직장·직책 등에로) 복귀시키다. (원위치·상태로) 회복시키다',
  //       _id: '5e1e4c5258c4f41ce46eba28',
  //       synonyms: 'restore, rehabilitate',
  //       examples: [
  //         'There have been repeated calls to reinstate the death penalty.',
  //         'He was reinstated in his post.',
  //         'I was reinstated in the service last month.'
  //       ],
  //       priority: 2,
  //       createdAt: { $date: '2020-01-13T14:00:00.000+00:00' },
  //       updatedAt: { $date: '2020-01-13T14:00:00.000+00:00' }
  //     },
  //     {
  //       text: '3condescend',
  //       _id: '5e1e4c5258c4f41ce46eba29',
  //       definition:
  //         ' someone condescends to do something, they agree to do it, but in a way which shows that they think they are better than other ',
  //       synonyms: '',
  //       examples: [
  //         'When he condescended to speak, he contradicted himself three or four times in the space of half an hour.',
  //         'He has a condescending attitude towards women.',
  //         'We had to wait almost an hour before he condescended to see us.'
  //       ],
  //       priority: 3,
  //       createdAt: { $date: '2020-01-14T14:00:00.000+00:00' },
  //       updatedAt: { $date: '2020-01-14T14:00:00.000+00:00' }
  //     },
  //     {
  //       text: '4minimum wages',
  //       _id: '5e1e4c5258c4f41ce46eba2a',
  //       definition: '최저임금',
  //       synonyms: 'floor wage, rock-bottom salary',
  //       examples: [
  //         'The government supported the unions in their demand for a minimum wage.',
  //         "Do you know the minimum wage? - I don't know."
  //       ],
  //       priority: 1,
  //       createdAt: { $date: '2020-01-16T14:00:00.000+00:00' },
  //       updatedAt: { $date: '2020-01-16T14:00:00.000+00:00' }
  //     },
  //     {
  //       text: '5worse to come',
  //       _id: '5e1e4c5258c4f41ce46eba2b',
  //       definition: '더 안 좋은 일이 있을 것 같다.',
  //       synonyms: 'worse things are yet to come',
  //       examples: [
  //         'I’m afraid there is worse to come',
  //         'Experts openly tell of the drastic decline of American fortunes and warn of worse to come.'
  //       ],
  //       priority: 2,
  //       createdAt: { $date: '2020-01-15T14:02:20.000+00:00' },
  //       updatedAt: { $date: '2020-01-15T14:02:20.000+00:00' }
  //     },
  //     {
  //       text: '6rain down',
  //       _id: '5e1e4c5258c4f41ce46eba2c',
  //       definition:
  //         'to fall or to make something fall on somebody/something in large quantities',
  //       synonyms: '',
  //       examples: [
  //         'Bombs rained (down) on the city’s streets',
  //         'He covered his face as the blows rained down on him'
  //       ],
  //       priority: 2,
  //       createdAt: { $date: '2020-01-15T14:01:10.000+00:00' },
  //       updatedAt: { $date: '2020-01-15T14:01:10.000+00:00' }
  //     },
  //     {
  //       text: '7underwhelm',
  //       definition: 'to fall to give a satisfaction, to disappoint',
  //       synonyms: 'disappoint, disatisfire',
  //       _id: '5e1e4c5258c4f41ce46eba2d',
  //       examples: [
  //         'We were distinctly underwhelmed by the director’s speech. ',
  //         'Not feeling it. Very underwhelming.'
  //       ],
  //       priority: 3,
  //       createdAt: { $date: '2020-01-15T14:01:10.000+00:00' },
  //       updatedAt: { $date: '2020-01-15T14:01:10.000+00:00' }
  //     },
  //     {
  //       text: '8carbon footprint',
  //       _id: '5e1e5f32f651c04fb895f124',
  //       definition:
  //         ' a measure of the amount of carbon dioxide released into the atmosphere by a single endeavour or by a company, household, or individual through day-to-day activities over a given period',
  //       synonyms: 'amount of carbon dioxide',
  //       examples: [
  //         'Eco-production helps reduce the carbon footprint. ',
  //         'It can tell you how large your carbon footprint is. '
  //       ],
  //       priority: 3
  //     }
  //   ]);
  // }, []);

  if (loading || words == null) {
    return <Preloader />;
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <div className='row'>
        {words != null &&
          words.map(word => <WordItem word={word} key={word._id} />)}
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

// export default Words;
