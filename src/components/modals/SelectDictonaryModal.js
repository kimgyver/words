import React, { useState, useEffect } from 'react';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import { selectDictionary } from '../../actions/wordActions';

const SelectDictionaryModal = ({
  candidatesDictionaries,
  selectDictionary,
  loading
}) => {
  const [options, setOptions] = useState([]);
  const [searchingWord, setSearchingWord] = useState('');

  useEffect(() => {
    console.log();
  }, [searchingWord, options]);

  const onChange = e => {
    // current array of options
    const opts = [...options];
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      opts.push(+e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = opts.indexOf(+e.target.value);
      opts.splice(index, 1);
    }

    // sort the array
    opts.sort();

    // update the state with the new array of options
    //this.setState({ options: options });
    console.log(opts);
    setOptions(opts);
    console.log(options);
  };

  const onSubmit = () => {
    console.log(
      'result:',
      options.map(i => candidatesDictionaries[i])
    );
    selectDictionary({ options: options.map(i => candidatesDictionaries[i]) });

    // Clear Fields
    deselectAll();
    setOptions([]);
  };

  const onClose = () => {
    // Clear Fields
    deselectAll();
    setOptions([]);
  };

  const deselectAll = () => {
    const checkArr = Array.from(window.document.querySelectorAll('#dic'));
    checkArr.forEach(c => (c.checked = false));
  };

  if (loading) return <Preloader />;

  return (
    <div id='select-dictionary-modal' className='modal'>
      <div className='modal-content'>
        <h4>Select definitions</h4>
        <input
          readOnly
          type='text'
          id='searching-word'
          onChange={e => setSearchingWord(e.target.value)}
        />

        <div id='dic-checkboxs'>
          {candidatesDictionaries === null ||
          candidatesDictionaries === undefined ? (
            <div>
              <h5>Nothing is looked up.</h5>
            </div>
          ) : (
            candidatesDictionaries.map((r, index) => (
              <div className='row' key={index}>
                <div className='input-field'>
                  <label>
                    <input
                      name='dic'
                      id='dic'
                      type='checkbox'
                      className='filled-in'
                      value={index}
                      //checked={this.state.dics[index]}
                      onChange={onChange}
                    />
                    <span style={{ overflow: 'auto' }}>{r.definition}</span>
                  </label>
                </div>
              </div>
            ))
          )}

          <div className='modal-footer' style={{ marginTop: '4rem' }}>
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
    </div>
  );
};

// const modalStyle = {
//   width: '75%',
//   height: '75%'
// };

const mapStateToProps = state => ({
  candidatesDictionaries: state.word.candidatesDictionaries,
  loading: state.word.loading
});

export default connect(mapStateToProps, { selectDictionary })(
  SelectDictionaryModal
);
