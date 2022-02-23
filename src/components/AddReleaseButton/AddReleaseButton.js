import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import styles from './AddReleaseButton.module.scss';

const AddReleaseButton = ({ releaseId }) => {
  return (
    <div className="d-flex">
      <FontAwesomeIcon className={styles.addButton} icon={faAdd} />
    </div>
  )
}

AddReleaseButton.propTypes = {
  releaseId: PropTypes.number.isRequired,
}

export default AddReleaseButton
