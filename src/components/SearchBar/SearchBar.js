import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const { query, setQuery } = useFetchResults();

  const handleSelect = (event) => {
    setQuery({ ...query, type: event.target.value });
  };

  return (
    <div className={styles.searchBar}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search any release"
        value={query.slug}
        onChange={(event) => setQuery({ ...query, slug: event.target.value })}
      />
      <select id="types" name="types" onChange={handleSelect} className={styles.searchType}>
        <option defaultValue={query.type}>All</option>
        <option value="artist">Artist</option>
        <option value="master">Release</option>
      </select>
    </div>
  );
};

export default SearchBar;
