import React from 'react';
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
          {' '}
          <span>{result.year && `(${result.year})`}</span>
          {' '}
          <span>{result.country && `· ${result.country}`}</span>
        </h3>
        <p className={styles.resultType}>{resultType}</p>
      </div>
      <div className="d-flex align-items-start">
        <p className="chevron">›</p>
      </div>
    </li>
  );
};

export default SearchResultItem;
