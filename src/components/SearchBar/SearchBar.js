import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const { query, setQuery } = useFetchResults();

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search any release"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;
