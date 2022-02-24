import React from 'react';
import { BrowserRouter, Link, Routes, Route, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import SearchPage from './pages/SearchPage/SearchPage';
import Collection from './pages/Collection/Collection';
import { height, style } from 'dom-helpers';

function App() {
  const styles = {
    nav: {
      border: "solid blue 2px",
      height: "7rem",
    },
    link: {
      width: "100%",
    },
    linkIcon: {
      fontSize: "4rem",
      color: "orange",
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="border border-danger">
            <SearchPage />
          </div>
          }
        />
        <Route path="collection" element={<Collection />}/>
      </Routes>
        <nav
          style={styles.nav}
          className="d-flex"
        >
          <Link to="/" className="d-flex" style={styles.link}>
            <FontAwesomeIcon icon={faSearch} style={styles.linkIcon} />
          </Link> | {" "}
          <Link to="/collection" className="d-flex" style={styles.link}>
            <FontAwesomeIcon icon={faRecordVinyl} style={styles.linkIcon} />
          </Link>
        </nav>
        <Outlet />
    </BrowserRouter>
  );
}

export default App;
