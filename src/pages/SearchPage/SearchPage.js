import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import Message from '../../common/Message/Message';
import styles from './SearchPage.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { discogsSearchState } from '../../slices/discogsSearch';
import SearchResults from '../../components/SearchResults/SearchResults';
import Collection from '../../components/Collection/Collection';
import PageHeader from '../../components/PageHeader/PageHeader';
import { messageState } from '../../slices/message';

const SearchPage = ({ setSort }) => {
  const { message, type } = useSelector(messageState);
  const { results, status, pagination } = useSelector(discogsSearchState);

  let searchResultsContent;

  if (status === 'idle') {
    searchResultsContent = <p>Search results will show up here.</p>;
  } else if (status === 'pending') {
    searchResultsContent = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    searchResultsContent = (
      <ul>
        <SearchResults
          results={results}
          pagination={pagination}
        />
      </ul>
    );
  }

  return (
    <>
      <PageHeader />
      <div className={styles.searchPage}>
        <SearchBar />
        <div className={styles.resultsSection}>
          {searchResultsContent}
        </div>
        <div className={styles.collectionSection}>
          <Collection
            setSort={setSort}
          />
        </div>
        {!(message === '') && (
          <Message message={message} type={type} />
        )}
      </div>
    </>
  );
};

SearchPage.propTypes = {
  setSort: PropTypes.func.isRequired,
};

export default SearchPage;
