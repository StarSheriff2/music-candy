import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../slices/discogsSearch';
import useFetchResults from '../../hooks/fetchResults';
import styles from './SearchBar.module.scss';
import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';

const SearchBar = () => {
  const { data, setData } = useFetchResults();

  const dispatch = useDispatch();

  const handleSelect = (event) => {
    setData({ ...data, query: { ...data.query, type: event.target.value } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { slug, type } = data.query;
      dispatch(search({ slug, type, perPage: 50, page: null }));
      setData({ results: [], query: { slug: '', ...data.query }});
    }
  }

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="search"
          placeholder="search any release"
          value={data.query.slug}
          onChange={(event) => setData({
            ...data,
            query: { ...data.query, slug: event.target.value },
          })}
          onKeyPress={handleKeyPress}
        />
        <select id="types" name="types" onChange={handleSelect} className={styles.searchType}>
          <option defaultValue={data.query.type}>All</option>
          <option value="artist">Artist</option>
          <option value="master">Release</option>
        </select>
      </div>
      {(data.results.length > 0) && (
      <div className={styles.searchResultsWrapper}>
        <ul className={styles.searchResults}>
          {
          data.results.map((r) => <SearchResultItem key={r.id} result={r} />)
        }
        </ul>
      </div>
      )}
    </div>
  );
};

export default SearchBar;
