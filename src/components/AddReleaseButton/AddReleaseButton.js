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

const AddReleaseButton = ({ releaseId, context }) => {
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

  const buttonValue = (context) ? <span>Add Release</span> : <FontAwesomeIcon icon={faAdd} />;

  return (
    <div className="d-flex">
      <button
        type="button"
        className={(context) ? styles.modalAddButton : styles.addButton}
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
            buttonValue
          )}
      </button>
    </div>
  );
};

AddReleaseButton.defaultProps = {
  context: null,
};

AddReleaseButton.propTypes = {
  releaseId: PropTypes.number.isRequired,
  context: PropTypes.string,
};

export default AddReleaseButton;
