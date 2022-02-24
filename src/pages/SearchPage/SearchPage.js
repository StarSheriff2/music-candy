import React, { useState, useEffect, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../common/Message/Message';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { discogsSearchState } from '../../slices/discogsSearch';
import SearchResults from '../../components/SearchResults/SearchResults';
import Collection from '../../components/Collection/Collection';

import { messageState, clearMessage } from '../../slices/message';
export const SearchPageSortingContext = createContext('artist');

const SearchPage = () => {
  const { message, type } = useSelector(messageState);
  const { results, status, pagination } = useSelector(discogsSearchState);
  const [sort, setSort] = useState('artist');

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
            <SearchPageSortingContext.Provider value={sort}>
              <SearchResults
                results={results}
                pagination={pagination}
              />
            </SearchPageSortingContext.Provider>
          </ul>
          )}
      </div>
      <div className={styles.collectionSection}>
        <Collection
          sort={sort}
          setSort={setSort}
        />
      </div>

      {!(message === '') && (
        <Message message={message} type={type} />
      )}
    </div>
  );
};

export default SearchPage;
