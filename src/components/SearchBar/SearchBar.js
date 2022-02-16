import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const { query, setQuery } = useFetchResults();

  return (
    <div className={styles.searchBar}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search any release"
        value={query.slug}
        onChange={(event) => setQuery({ ...query, slug: event.target.value})}
      />
    </div>
  );
};

export default SearchBar;
