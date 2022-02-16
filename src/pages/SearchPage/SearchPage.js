import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';

import { clearMessage } from '../../slices/message';

const SearchPage = () => {
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div>
      <h1>Music Candy</h1>
      <div>
        <SearchBar />
      </div>
      <div>
        Search Results component
      </div>
      <div>
        MY Collection
      </div>

      {message && (
      <div className="alert alert-info" role="alert">
        {message}
      </div>
      )}
    </div>
  );
};

export default SearchPage;
