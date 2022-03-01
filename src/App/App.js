import React, { useState, useContext } from 'react';
import {
  BrowserRouter, Link, Routes, Route, Outlet,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import SearchPage from '../pages/SearchPage/SearchPage';
import Collection from '../pages/Collection/Collection';
import Artist from '../pages/Artist/Artist';
import SearchPageCollectionSorting from '../Context';
import styles from './App.module.scss';

const App = () => {
  const sortType = useContext(SearchPageCollectionSorting);
  const [sort, setSort] = useState(sortType);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <SearchPageCollectionSorting.Provider value={sort}>
              <SearchPage setSort={setSort} />
            </SearchPageCollectionSorting.Provider>
          )}
        />
        <Route path="collection" element={<Collection />} />
        <Route path="artists/:artistId" element={<Artist />} />
        <Route
          path="*"
          element={(
            <main className={styles.noMatch}>
              <p>There&apos;s nothing here</p>
            </main>
      )}
        />
      </Routes>
      <nav
        className={`d-flex ${styles.bottomNav}`}
      >
        <Link to="/" className={`d-flex ${styles.link}`}>
          <FontAwesomeIcon icon={faSearch} className={styles.linkIcon} />
        </Link>
        {' '}
        |
        {' '}
        <Link to="/collection" className={`d-flex ${styles.link}`}>
          <FontAwesomeIcon icon={faRecordVinyl} className={styles.linkIcon} />
        </Link>
      </nav>
      <Outlet />
    </BrowserRouter>
  );
};

export default App;
