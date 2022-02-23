import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { addRelease } from '../../slices/discogsCollection';
import styles from './AddReleaseButton.module.scss';

const AddReleaseButton = ({ releaseId }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(addRelease(releaseId));

  return (
    <div className="d-flex">
      <button
        type="button"
        className={styles.addButton}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={faAdd} />
      </button>
    </div>
  )
}

AddReleaseButton.propTypes = {
  releaseId: PropTypes.number.isRequired,
}

export default AddReleaseButton
