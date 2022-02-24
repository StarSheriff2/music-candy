import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, discogsCollectionState } from '../../slices/discogsCollection';
import styles from './Collection.module.scss';
import albumNoArt from '../../common/no-album-art.jpeg';

const Collection = ({ sort, setSort }) => {
  const dispatch = useDispatch();

  const { status: collectionStatus, collection, pagination } = useSelector(discogsCollectionState);

  useEffect(() => {
    if (collectionStatus === 'idle') {
      dispatch(get(sort));
    }
  }, []);

  useEffect(() => {
    if (collectionStatus === 'fulfilled') dispatch(get(sort));
  }, [sort]);

  const handleSelect = (event) => setSort(event.target.value);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className={styles.title}>My Collection <span>{`(${pagination.items})`}</span></h2>
        <label htmlFor="sort">
          Sort by
          <select id="sort" name="sort" onChange={handleSelect} className={styles.sortDd}>
            <option value="artist">Artist</option>
            <option value="title">Release Title</option>
          </select>
        </label>
      </div>
      <div className="d-flex overflow-scroll justify-content-between">
        {collection.map((c) => {
          const { basic_information: release } = c;
          return (
            <div className={`flex-column p-3 flex-shrink-0 flex-grow-0 ${styles.releaseCard}`} key={c.instance_id}>
              <img
                src={(release.thumb === '') ? albumNoArt : release.thumb}
                alt="release thumbnail"
                className={styles.thumbnail}
              />
              <h3 className={styles.title}>
                {release.title}
              </h3>
              <p className={styles.name}>
                {release.artists[0].name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Collection.propTypes = {

// }

export default Collection;
