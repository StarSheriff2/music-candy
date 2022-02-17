import React from 'react';
import albumNoArt from '../../common/no-album-art.jpeg';
import styles from './SearchResults.module.scss';

const SearchResults = ({ results }) => (
  results.map((r) => {
    let resultType;
    if (r.type === 'artist') {
      resultType = 'Artist';
    } else if (r.type === 'master') {
      resultType = 'Master Release';
    } else {
      resultType = 'Release';
    }

    return (
      <li key={r.id} className={styles.resultItem}>
        <img
          src={(r.thumb === '') ? albumNoArt : r.thumb}
          alt="search result thumbnail"
          className={styles.thumb}
        />
        <div className={styles.resultData}>
          <h3 className={styles.resultTitle}>
            {r.title}
            {' '}
            <span>{r.year && `(${r.year})`}</span>
            {' '}
            <span>{r.country && `· ${r.country}`}</span>
          </h3>
          <p className={styles.resultType}>{resultType}</p>
        </div>
      </li>
    );
  })
);

export default SearchResults;
