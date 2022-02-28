import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './PageHeader.module.scss';

const PageHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let headerContent;

  if (pathname === '/' || pathname === '/collection') {
    headerContent = (
      <>
        <button type="button" onClick={() => window.location.reload()}>
          Music Candy
        </button>
        {(pathname !== '/') && (<p>Your Collection</p>)}
      </>
    );
  } else {
    headerContent = (
      <>
        <button type="button" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <p>{`/${pathname.split('/')[1]}`}</p>
      </>
    );
  }

  return (
    <header className={`d-flex position-relative ${styles.pageHeader}`}>
      {headerContent}
    </header>
  );
};

export default PageHeader;
