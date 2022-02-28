import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { addRelease, discogsCollectionState } from '../../slices/discogsCollection';
import { clearMessage } from '../../slices/message';
import SearchPageCollectionSorting from '../../Context';
import styles from './AddReleaseButton.module.scss';

const AddReleaseButton = ({ releaseId }) => {
  const sort = useContext(SearchPageCollectionSorting);
  const dispatch = useDispatch();

  const { addReleaseStatus } = useSelector(discogsCollectionState);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      dispatch(addRelease({ releaseId, sort }));
    }

    if (addReleaseStatus === 'fulfilled') {
      setLoading(false);
    }

    return () => {
      setLoading(false);
      dispatch(clearMessage());
    };
  }, [isLoading]);

  const handleClick = (e) => {
    e.stopPropagation();
    setLoading(true);
  };

  return (
    <div className="d-flex">
      <button
        type="button"
        className={styles.addButton}
        onClick={!isLoading ? handleClick : null}
        disabled={isLoading}
      >
        {(isLoading)
          ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )
          : (
            <FontAwesomeIcon
              icon={faAdd}
            />
          )}
      </button>
    </div>
  );
};

AddReleaseButton.propTypes = {
  releaseId: PropTypes.number.isRequired,
};

export default AddReleaseButton;
