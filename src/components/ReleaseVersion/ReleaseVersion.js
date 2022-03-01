/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { v4 } from 'uuid';

import AddReleaseButton from '../AddReleaseButton/AddReleaseButton';
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

  return (
    <Modal
      show={show}
      onHide={handleClose}
      // size="lg"
      centered
      contentClassName={styles.modal}
      onEnter={loadData}
    >
      <Modal.Header closeButton bsPrefix={styles.header}>
        <Modal.Title>
          {releaseData && <h2 className="fs-1">{releaseData.title}</h2>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {releaseData && (
          <Container>
              {('thumb' in releaseData) && (
                <Row>
                  <Col
                    className="d-flex mb-4"
                  >
                    <img src={releaseData.thumb} alt="album thumb" />
                  </Col>
                </Row>
              )}
            <section className="mx-5 mb-4">
              <Row>
                <Col xs={3}>
                  Label
                </Col>
                <Col className="overflow-hidden">
                  {'labels' in releaseData && (
                  <span>
                    {releaseData.labels.map((l, ind, arr) => (
                      <span key={v4()}>
                        {`${l.name}${(ind !== arr.length - 1) ? ', ' : ''}`}
                      </span>
                    ))}
                  </span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <span>Formats</span>
                </Col>
                <Col className="overflow-hidden">
                  {'formats' in releaseData && (
                  <span>
                    {releaseData.formats.map((f, ind, arr) => (
                      <span key={v4()}>
                        {`${f.name}${(ind !== arr.length - 1) ? ', ' : ''}`}
                      </span>
                    ))}
                  </span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <span>Country</span>
                </Col>
                <Col className="overflow-hidden">
                  {'country' in releaseData && (
                  <span>
                    {releaseData.country}
                  </span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <span>Released</span>
                </Col>
                <Col className="overflow-hidden">
                  {'released_formatted' in releaseData && (
                  <span>
                    {releaseData.released_formatted}
                  </span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <span>Genre</span>
                </Col>
                <Col className="overflow-hidden">
                  {'genres' in releaseData && (
                  <span>
                    {releaseData.genres.map((g, ind, arr) => (
                      <span key={v4()}>{`${g}${(ind !== arr.length - 1) ? ', ' : ''}`}</span>
                    ))}
                  </span>
                  )}
                </Col>
              </Row>
            </section>
            {('tracklist' in releaseData) && (
              <section>
                <h2 className="mb-4"><strong>Tracklist</strong></h2>
                <Table>
                  <tbody>
                    {releaseData.tracklist.map((t) => (
                      <tr key={v4()} className="border-top border-1 border-dark">
                        <td>{t.position}</td>
                        <td>{t.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </section>
            )}
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        {releaseData && (<AddReleaseButton releaseId={releaseData.id} context="releaseVersion" />)}
      </Modal.Footer>
    </Modal>
  );
};

ReleaseVersion.propTypes = {
  show: PropTypes.bool.isRequired,
  releaseId: PropTypes.number.isRequired,
  setShowRelease: PropTypes.func.isRequired,
};

export default ReleaseVersion;
