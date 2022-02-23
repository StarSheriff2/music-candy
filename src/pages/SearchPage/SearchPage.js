import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../../common/Message/Message';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { discogsSearchState } from '../../slices/discogsSearch';
import SearchResults from '../../components/SearchResults/SearchResults';
import Collection from '../../components/Collection/Collection';

import { messageState } from '../../slices/message';

const SearchPage = () => {
  const { message, type } = useSelector(messageState);
  const { results, status, pagination } = useSelector(discogsSearchState);

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

      {!(message === '') && (
        <Message message={message} type={type} />
      )}
    </div>
  );
};

export default SearchPage;
