import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, discogsCollectionState } from '../../slices/discogsCollection';
import styles from './Collection.module.scss';
import albumNoArt from '../../common/no-album-art.jpeg';
// import PropTypes from 'prop-types';

const Collection = () => {
  const dispatch = useDispatch();

  const { status: collectionStatus, collection } = useSelector(discogsCollectionState);

  useEffect(() => {
    if (collectionStatus === 'idle') {
      dispatch(get());
    }
  }, []);

  return (
    (collectionStatus === 'fulfilled')
    && (
      <>
        <h2 className={styles.title}>My Collection</h2>
        <div className="d-flex overflow-scroll justify-content-start">
          {collection.map((c) => {
            const { basic_information: release } = c;
            return (
              <div className="d-flex flex-column p-3" key={c.id}>
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
    )
    // collection.map((c) => {
    //   const { basic_information: release } = c;
    //   console.log('basic information: ', release)

  // return (
  //   <div className="container" key={c.id}>
  //     <div className="row">
  //       <div className="column">
  //         <img
  //           src={release.thumb}
  //           alt="release cover art"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )
  // })
  );
};

// Collection.propTypes = {

// }

export default Collection;
