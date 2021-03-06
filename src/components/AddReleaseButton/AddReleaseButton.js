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

const AddReleaseButton = ({
  releaseId, context, setShowRelease, setShow,
}) => {
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
    if (context === 'releaseVersion') {
      setShowRelease(false);
      dispatch(addRelease({ releaseId, sort }));
    } else if (context === 'searchBar') {
      setShow(false);
      dispatch(addRelease({ releaseId, sort }));
    } else {
      setLoading(true);
    }
  };

  const buttonValue = (context === 'releaseVersion') ? <span>Add Release</span> : <FontAwesomeIcon icon={faAdd} />;

  return (
    <div className="d-flex">
      <button
        type="button"
        className={(context === 'releaseVersion') ? styles.modalAddButton : styles.addButton}
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
  setShowRelease: null,
  setShow: null,
};

AddReleaseButton.propTypes = {
  releaseId: PropTypes.number.isRequired,
  context: PropTypes.string,
  setShowRelease: PropTypes.func,
  setShow: PropTypes.func,
};

export default AddReleaseButton;
