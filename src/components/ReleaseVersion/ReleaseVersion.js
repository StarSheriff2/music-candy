/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
// import AddReleaseButton from '../AddReleaseButton/AddReleaseButton';
import discogsApiService from '../../services/discogs.service';
import { setMessage } from '../../slices/message';
import styles from './ReleaseVersion.module.scss';

const ReleaseVersion = ({ releaseId, show, setShowRelease }) => {
  const dispatch = useDispatch();
  const handleClose = () => setShowRelease(false);

  const [releaseData, setReleaseData] = useState(undefined);

  const loadData = async () => {
    try {
      const response = await discogsApiService.getVersionDetails(releaseId);
      console.log('data has been dowloaded')
      setReleaseData(response.data);
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      dispatch(setMessage({ message, type: 'danger' }));
    }
  };

  console.log({releaseData});

//   const releaseObg = {

//     artists: [Object] (1)

// artists_sort: "Beatles, The"

// blocked_from_sale: false

// community: {have: 224, want: 459, rating: {count: 24, average: 4.58}, submitter: {username: "ziggystardust60", resource_url: "https://api.discogs.com/users/ziggystardust60"}, contributors: Array, …}

// companies: [] (0)

// country: "Italy"

// data_quality: "Needs Vote"

// date_added: "2013-10-10T13:32:48-07:00"

// date_changed: "2021-05-27T06:18:26-07:00"

// estimated_weight: 170

// extraartists: [Object, Object, Object, Object, Object, Object, Object, Object, Object] (9)

// format_quantity: 2

// formats: [{name: "CD", qty: "2", descriptions: ["Album", "Remastered", "Enhanced"]}] (1)

// genres: ["Rock"] (1)

// id: 4987524

// identifiers: [{type: "Rights Society", value: "SDRM BIEM"}, {type: "Mastering SID Code", value: "IFPI LN12"}, {type: "Matrix / Runout", value: "MX 25520 BEATLES 4cd1 CD094P804"}, {type: "Matrix / Runout", value: "MX 26141 BEATLES 4cd2 CD094P815"}, {type: "Label Code", value: "LC 0299"}] (5)

// images: [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, …] (19)

// labels: [Object, Object] (2)

// lowest_price: 8

// master_id: 46402

// master_url: "https://api.discogs.com/masters/46402"

// notes: "The 2nd CD incudes a data track: The Beatles Mini Documentary (Visible on a computer)↵Includes a 28-page booklet + Poster ↵Italian editio…"

// num_for_sale: 4

// released: "2012-11-06"

// released_formatted: "06 Nov 2012"

// resource_url: "https://api.discogs.com/releases/4987524"

// series: [Object] (1)

// status: "Accepted"

// styles: ["Art Rock", "Pop Rock"] (2)

// thumb: "https://i.discogs.com/ytMPN1W0pNUG4f_5rCKG1wFiSfO7LWmm3gTlvGvy2g0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTQ5/ODc1MjQtMTM…"

// title: "The Beatles"

// tracklist: [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, …] (32)

// uri: "https://www.discogs.com/release/4987524-The-Beatles-The-Beatles"

// videos: [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, …] (35)

// year: 2012
//   }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      // size="lg"
      centered
      contentClassName={styles.modal}
      onEnter={loadData}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {releaseData && releaseData.title}
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
  // releaseId: PropTypes.shape(
  //   null,
  // ).isRequired,
  setShowRelease: PropTypes.func.isRequired,
};

export default ReleaseVersion;
