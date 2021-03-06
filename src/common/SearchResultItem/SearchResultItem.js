import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddReleaseButton from '../../components/AddReleaseButton/AddReleaseButton';
import ReleaseVersion from '../../components/ReleaseVersion/ReleaseVersion';
import styles from './SearchResultItem.module.scss';
import albumNoArt from '../no-album-art.jpeg';

const SearchResultItem = ({ result, context, setShow }) => {
  const [showRelease, setShowRelease] = useState(false);

  const handleClick = () => {
    if (result.type === 'release') setShowRelease(true);
  };

  let resultType;
  if (result.type === 'artist') {
    resultType = 'Artist';
  } else if (result.type === 'master') {
    resultType = 'Master Release';
  } else {
    resultType = 'Release';
  }

  return (
    <>
      <div className={styles.resultItem} onClick={handleClick} role="button" onKeyPress={handleClick} tabIndex={0}>
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
        {(result.type === 'release')
          ? (
            <AddReleaseButton releaseId={result.id} context={context} setShow={setShow} />
          ) : (
            <div className="d-flex">
              <FontAwesomeIcon icon={faChevronRight} className={(context === 'searchBar') ? styles.colorB : styles.colorA} />
            </div>
          )}
      </div>
      {(result.type === 'release') && <ReleaseVersion releaseId={result.id} show={showRelease} setShowRelease={setShowRelease} />}
    </>
  );
};

SearchResultItem.defaultProps = {
  setShow: null,
};

SearchResultItem.propTypes = {
  result: PropTypes.shape({
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    country: PropTypes.string,
    year: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  context: PropTypes.string.isRequired,
  setShow: PropTypes.func,
};

export default SearchResultItem;
