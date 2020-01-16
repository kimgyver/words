import React, { Fragment, useEffect } from 'react';
import AddBtn from './components/layout/AddBtn';
import AddWordModal from './components/modals/AddWordModal';
import DeleteWordModal from './components/modals/DeleteWordModal';
import Words from './components/Words';
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
        {/* <SearchBar /> */}
        <div style={{ margin: '0 50px 0 50px' }}>
          <AddBtn />
          <DeleteWordModal />
          <AddWordModal />
          {/*
        <EditLogModal />
        <AddTechModel /> 
        <TechListModal />*/}
          <Words />
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
