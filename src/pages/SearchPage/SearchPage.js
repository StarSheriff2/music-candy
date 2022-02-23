import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { discogsSearchState } from '../../slices/discogsSearch';
import SearchResults from '../../components/SearchResults/SearchResults';
import Collection from '../../components/Collection/Collection';

import { clearMessage } from '../../slices/message';

const SearchPage = () => {
  const { message } = useSelector((state) => state.message);
  const { results, status, pagination } = useSelector(discogsSearchState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div className={styles.searchPage}>
      <h1>Music Candy</h1>

      <SearchBar />

      <div className={styles.resultsSection}>
        {status === 'fulfilled'
          && (
          <ul>
            <SearchResults results={results} pagination={pagination} />
          </ul>
          )}
      </div>
      <div className={styles.collectionSection}>
        <Collection />
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
