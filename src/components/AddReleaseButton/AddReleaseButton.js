import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import styles from './AddReleaseButton.module.scss';

const AddReleaseButton = ({ releaseId }) => {

  return (
    <div className="d-flex">
      <button
        type="button"
        className={styles.addButton}
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
