import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchResultItem.module.scss';
import albumNoArt from '../no-album-art.jpeg';

const SearchResultItem = ({ result }) => {
  let resultType;
  if (result.type === 'artist') {
    resultType = 'Artist';
  } else if (result.type === 'master') {
    resultType = 'Master Release';
  } else {
    resultType = 'Release';
  }

  return (
    <li className={styles.resultItem}>
      <img
        src={(result.thumb === '') ? albumNoArt : result.thumb}
        alt="search result thumbnail"
        className={styles.thumb}
      />
      <div className={styles.resultData}>
        <h3 className={styles.resultTitle}>
          {result.title}
        </h3>
        <p className={styles.resultType}>
          {resultType}
          <span>{result.country && `· ${result.country}`}</span>
          {' '}
          <span>{result.year && `(${result.year})`}</span>
        </p>

      </div>
      <div className="d-flex">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </li>
  );
};

export default SearchResultItem;
