import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import './SettingModal.scss';

const SettingModal = () => {
  const displayOrderOptions = [
    'Priority (1 > 2 > 3)',
    'Updated Time',
    'Alphabet',
    'Created Time',
    ''
  ];

  const [order1, setOrder1] = useState(displayOrderOptions[0]);
  const [order2, setOrder2] = useState(displayOrderOptions[1]);
  const [order3, setOrder3] = useState(displayOrderOptions[2]);
  const [randomOrder, setRandomOrder] = useState(false);

  const getSetting = () => {
    // read from localStorage
    let savedSetting = localStorage.getItem('wordOrderSetting');
    if (savedSetting !== null) {
      savedSetting = JSON.parse(savedSetting);
      //console.log(savedSetting);
      setOrder1(savedSetting.order1);
      setOrder2(savedSetting.order2);
      setOrder3(savedSetting.order3);
      setRandomOrder(savedSetting.randomOrder);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = () => {
    const setting = {
      order1,
      order2,
      order3,
      randomOrder
    };

    localStorage.setItem('wordOrderSetting', JSON.stringify(setting));

    M.toast({ html: `Settring updated...` });

    window.location.reload();
  };

  const onClose = () => {
    // Clear Fields
    getSetting();
  };

  return (
    <div id='setting-modal' className='modal'>
      <div className='modal-content'>
        <h4>Display Order</h4>

        <div className='row'>
          <div>
            <label htmlFor='order1' className='active'>
              Order 1
            </label>
            <select
              name='order1'
              value={order1}
              className='browser-default'
              onChange={e => setOrder1(e.target.value)}
            >
              {Array.from(displayOrderOptions, (e, i) => {
                return (
                  <option value={displayOrderOptions[i]} key={i}>
                    {displayOrderOptions[i]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className='row'>
          <div>
            <label htmlFor='order2' className='active'>
              Order 2
            </label>
            <select
              name='order2'
              value={order2}
              className='browser-default'
              onChange={e => setOrder2(e.target.value)}
            >
              {Array.from(displayOrderOptions, (e, i) => {
                return (
                  <option value={displayOrderOptions[i]} key={i}>
                    {displayOrderOptions[i]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className='row'>
          <div>
            <label htmlFor='order3' className='active'>
              Order 3
            </label>
            <select
              name='order3'
              value={order3}
              className='browser-default'
              onChange={e => setOrder3(e.target.value)}
            >
              {Array.from(displayOrderOptions, (e, i) => {
                return (
                  <option value={displayOrderOptions[i]} key={i}>
                    {displayOrderOptions[i]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={randomOrder}
                  value={randomOrder}
                  onChange={e => setRandomOrder(!randomOrder)}
                />
                <span>
                  Random Order (This option will ignore above order settings.)
                </span>
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

export default SettingModal;
