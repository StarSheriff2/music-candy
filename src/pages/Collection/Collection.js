/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { discogsCollectionState, get } from '../../slices/discogsCollection';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Collection.module.scss';

const Collection = () => {
  const { collection, status } = useSelector(discogsCollectionState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(get('artist'));
    }
  }, []);

  return (
    <>
      <PageHeader />
      {(status === 'fulfilled')
        ? (
          <>
            <Container className={styles.collectionListContainer}>
              <Row xs={2} sm={3} className="justify-content-center">
                {collection.map((release) => {
                  const { instance_id, basic_information } = release;
                  const { title, thumb } = basic_information;

                  return (
                    <Col key={instance_id} className={`justify-content-center ${styles.column}`}>
                      <div className={`d-flex flex-column justify-content-start align-items-center p-3 ${styles.releaseCard}`}>
                        <div className={styles.releaseContentWrapper}>
                          <div className={styles.imgWrapper}>
                            <div
                              className={styles.backgroundImageDiv}
                              style={{
                                background: `url(${thumb}) center center/cover no-repeat content-box`,
                              }}
                            />
                          </div>
                          <p className={styles.title}>{title}</p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </>
        )
        : (
          <div className="d-flex" style={{ marginTop: '3.5rem' }}>
            <Spinner animation="border" role="status" className="my-4">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
    </>
  );
};

export default Collection;
