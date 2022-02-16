import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../slices/discogsSearch';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => dispatch(search(query));

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search any release"
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        className={styles.searchBtn}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
      </button>
    </div>
  );
};

export default SearchBar;
