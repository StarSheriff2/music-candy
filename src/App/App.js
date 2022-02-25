import React from 'react';
import {
  BrowserRouter, Link, Routes, Route, Outlet,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import SearchPage from '../pages/SearchPage/SearchPage';
import Collection from '../pages/Collection/Collection';
import Artist from '../pages/Artist/Artist';
import styles from './App.module.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={(
          <div className="border border-danger">
            <SearchPage />
          </div>
        )}
      />
      <Route path="collection" element={<Collection />} />
      <Route path="artists/:artistId" element={<Artist />} />
      <Route path="*" element={
        <main className={styles.noMatch}>
          <p>There's nothing here</p>
        </main>
      }/>
    </Routes>
    <nav
      className={`d-flex ${styles.nav}`}
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

export default App;
