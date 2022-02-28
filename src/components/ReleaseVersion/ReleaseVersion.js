/* eslint-disable camelcase */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
// import AddReleaseButton from '../AddReleaseButton/AddReleaseButton';

// import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
// import styles from './SearchResults.module.scss';

const ReleaseVersion = ({ release, show, setShowRelease }) => {
  const handleClose = () => setShowRelease(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {release.title}
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

ReleaseVersion.propTypes = {
  show: PropTypes.bool.isRequired,
  release: PropTypes.shape(
    null,
  ).isRequired,
  setShowRelease: PropTypes.func.isRequired,
};

export default ReleaseVersion;
