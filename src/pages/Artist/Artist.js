import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import discogsApiService from '../../services/discogs.service';
import { setMessage, clearMessage } from '../../slices/message';
import styles from './Artist.module.scss';
// import PropTypes from 'prop-types';

const Artist = () => {
  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [artistInfo, setArtistInfo] = useState(undefined);

  const [artistReleases, setArtistReleases] = useState(undefined);

  useEffect(async () => {
    try {
      const responseArtistI = await discogsApiService.getArtistInfo(params.artistId, null);
      setArtistInfo(responseArtistI.data);
      const responseArtistR = await discogsApiService.getArtistReleases(params.artistId, null);
      const { releases, pagination } = responseArtistR.data;
      const releasesPayload = releases.filter((r) => r.type === 'release');
      setArtistReleases({ releases: releasesPayload, pagination});
    } catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
      dispatch(setMessage({ message, type: 'danger' }));
    }

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
              alt="artist image"
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
            <h3 className="my-4 text-center">Releases: </h3>
            {artistReleases && artistReleases.releases.map((r) => (
              <p key={r.id}>{r.title}</p>
            ))}
          </div>
        </>
        )}
      </div>
    </>
  );
};

// Artist.propTypes = {

// }

export default Artist;
