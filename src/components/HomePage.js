import React, { Fragment } from 'react';
import AddBtn from './layout/AddBtn';
import AddWordModal from './modals/AddWordModal';
import EditWordModal from './modals/EditWordModal';
import DeleteWordModal from './modals/DeleteWordModal';
import SettingModal from './modals/SettingModal';
import SelectDictionaryModal from './modals/SelectDictonaryModal';
import Words from './Words';
import SearchBar from './layout/SearchBar';
import '../App.scss';

const HomePage = () => {
  return (
    <Fragment>
      <SearchBar />
      <div className='root-container'>
        <AddBtn />
        <DeleteWordModal />
        <AddWordModal />
        <EditWordModal />
        <SettingModal />
        <SelectDictionaryModal />
        <Words />
      </div>
    </Fragment>
  );
};

export default HomePage;
