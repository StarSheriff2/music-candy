import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './DrillButton.module.scss';
// import PropTypes from 'prop-types';

const DrillButton = ({ type, id, context }) => (
  <Link
    className="d-flex"
    to={`/${type}s/${id}`}
  >
    <FontAwesomeIcon icon={faChevronRight} className={(context === 'searchResults') ? styles.colorA: styles.colorB} />
  </Link>
);

// DrillButton.propTypes = {

// }

export default DrillButton;
