import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import discogsApiService from '../../services/discogs.service';
import { setMessage, clearMessage } from '../../slices/message';
import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
import PaginationButtons from '../../common/PaginationButtons/PaginationButtons';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Artist.module.scss';

const Artist = () => {
  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [artistInfo, setArtistInfo] = useState(undefined);

  const [artistReleases, setArtistReleases] = useState(undefined);

  const fetchArtistData = async (page) => {
    try {
      const responseArtistI = await discogsApiService.getArtistInfo(params.artistId);
      setArtistInfo(responseArtistI.data);
      const responseArtistR = await discogsApiService.getArtistReleases(params.artistId, page);
      setArtistReleases(responseArtistR.data);
    } catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
      dispatch(setMessage({ message, type: 'danger' }));
    }
  };

  useEffect(() => {
    fetchArtistData();

    return () => {
      setArtistInfo(undefined);
      setArtistReleases(undefined);
      dispatch(clearMessage());
    };
  }, []);

  return (
    <>
      <div>
        <button type="button" onClick={() => navigate('/')}>go back</button>
      </div>
      <div className={`d-flex border-danger flex-column justify-content-start border ${styles.page}`}>
        {(artistInfo) && (
        <>
          <div className={`d-flex flex-column justify-content-start ${styles.artistInfoWrapper}`}>
            <img
              src={artistInfo.images[0].resource_url}
              alt="artist"
              className={styles.artistImage}
            />
            <h2 className={styles.title}>{artistInfo.name}</h2>
            <h3 className="mb-4">Bio: </h3>
            <p className={styles.description}>{artistInfo.profile}</p>

            {(artistInfo.members)
              ? (
                <>
                  <h3 className="mb-4">Members: </h3>
                  <ul className={styles.members}>
                    {artistInfo.members.map((m) => (
                      <li key={m.id}>{m.name}</li>
                    ))}
                  </ul>
                </>
              ) : null}
          </div>
          <div>
            {(artistReleases) ? (
            <>
              <h3 className="my-4 text-center">Releases: </h3>
              {artistReleases.releases.map((r) => (
                <SearchResultItem key={r.id} result={{ ...r, year: r.year.toString() }} context="artistPage" />
              ))}
              <hr />
              <PaginationButtons
                pagination={artistReleases.pagination}
                paginationOrigin="artist"
                fetchArtistData={fetchArtistData}
                displayedItems={artistReleases.releases.length}
              />
            </>
            ) :
            <Spinner animation="border" role="status" className="my-4" >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            }
          </div>
        </>
        )}
      </div>
    </>
  );
};

export default Artist;
