import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../slices/discogsSearch';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';
import SearchResults from '../SearchResults/SearchResults';

const SearchBar = () => {
  const { data, setData, cancelScheduledFetch } = useFetchResults();

  const dispatch = useDispatch();

  const handleSelect = (event) => {
    setData((prevData) => ({ ...prevData, query: { ...data.query, type: event.target.value } }));
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
        />
        <select id="types" name="types" onChange={handleSelect} value={data.query.type} className={styles.searchType}>
          <option value="all">All</option>
          <option value="artist">Artist</option>
          <option value="master">Release</option>
        </select>
        {/* <select id="sort" name="sort" onChange={handleSelect} value={sort} className={styles.sortDd}>
            <option value="artist">Artist</option>
            <option value="title">Release Title</option>
          </select> */}
      </div>
      {(data.results.length > 0) && (
      <div className={styles.searchResultsWrapper}>
        <div className={styles.searchResults}>
          <SearchResults results={data.results} context="searchBar" />
        </div>
      </div>
      )}
    </div>
  );
};

export default SearchBar;
