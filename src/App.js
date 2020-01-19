import React, { Fragment, useEffect } from 'react';
import AddBtn from './components/layout/AddBtn';
import AddWordModal from './components/modals/AddWordModal';
import EditWordModal from './components/modals/EditWordModal';
import DeleteWordModal from './components/modals/DeleteWordModal';
import SettingModal from './components/modals/SettingModal';
import Words from './components/Words';
import SearchBar from './components/layout/SearchBar';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <div className='root-container'>
          <AddBtn />
          <DeleteWordModal />
          <AddWordModal />
          <EditWordModal />
          <SettingModal />
          <Words />
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
