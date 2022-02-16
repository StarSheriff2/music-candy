import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  return (
    <>
      <input
        className={styles.searchBar}
        type="search"
        placeholder="search any release"
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button"><FontAwesomeIcon icon={solid('magnifying-glass')} /></button>
    </>
  );
};

export default SearchBar;
