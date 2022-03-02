import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { search } from '../../slices/discogsSearch';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';
import SearchResults from '../SearchResults/SearchResults';

const SearchBar = () => {
  const { data, setData, cancelScheduledFetch } = useFetchResults();

  const dispatch = useDispatch();

  const [showResults, setShow] = useState(false);

  const handleSelect = (event) => {
    setData((prevData) => ({ ...prevData, query: { ...data.query, type: event.target.value } }));
  };

  const handleOnFocus = () => setShow(true);

  const handleOnBlur = (e) => {
    const searchResultsWrapper = document.getElementById("searchBarResults");
    const t = e.relatedTarget;
    if (!(searchResultsWrapper && (searchResultsWrapper === t || searchResultsWrapper.contains(t)))) {
      setShow(false)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      cancelScheduledFetch();
      setData({ results: [], query: { slug: '', ...data.query } });
      const { slug, type } = data.query;
      dispatch(search({
        slug, type, perPage: 50, page: null,
      }));
    }
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="search"
          placeholder="search any release"
          value={data.query.slug}
          onChange={(event) => {
            setData((prevData) => ({
              ...prevData,
              query: { ...data.query, slug: event.target.value },
            }));
          }}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <Form.Select onChange={handleSelect} value={data.query.type} className={styles.searchType}>
          <option value="all">All</option>
          <option value="artist">Artist</option>
          <option value="master">Release</option>
        </Form.Select>
      </div>
      {(data.results.length > 0 && showResults) && (
      <div id="searchBarResults" className={styles.searchResultsWrapper}>
        <div className={styles.searchResults}>
          <SearchResults results={data.results} context="searchBar" setShow={setShow} />
        </div>
      </div>
      )}
    </div>
  );
};

export default SearchBar;
