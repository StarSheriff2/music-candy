import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { discogsSearchState } from '../../slices/discogsSearch';

import { clearMessage } from '../../slices/message';

const SearchPage = () => {
  const { message } = useSelector((state) => state.message);
  const { results } = useSelector(discogsSearchState);
  console.log(results);

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
        <h2>{results.title}</h2>
        <img src={results.thumb} alt="search result thumbnail" />

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
