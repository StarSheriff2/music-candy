/* eslint-disable camelcase */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import AddReleaseButton from '../AddReleaseButton/AddReleaseButton';

// import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
// import styles from './SearchResults.module.scss';

const ReleaseVersion = ({ release, show, setShowRelease }) => {
  const handleClose = () => setShowRelease(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Release Title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Release Description
      </Modal.Body>
      <Modal.Footer>
        Add Release to Collection
      </Modal.Footer>
    </Modal>

  );
};

// SearchResults.propTypes = {
//   results: PropTypes.arrayOf(PropTypes.shape({
//     Object,
//   })).isRequired,
//   pagination: PropTypes.shape(
//     null,
//   ).isRequired,
// };

export default ReleaseVersion;
