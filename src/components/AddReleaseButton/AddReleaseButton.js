import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { addRelease } from '../../slices/discogsCollection';
import styles from './AddReleaseButton.module.scss';

const AddReleaseButton = ({ releaseId }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const dispatchAction = async () => {
        const { meta } = await dispatch(addRelease(releaseId));
        if (meta.requestStatus === 'fulfilled') {
          setLoading(false);
        }
      };
      dispatchAction();
    }

    return () => {
      setLoading(false);
    };
  }, [isLoading]);

  const handleClick = () => setLoading(true);

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
