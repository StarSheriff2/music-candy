import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DrillButton.module.scss';

const DrillButton = ({ type, id, context }) => (
  <Link
    className="d-flex"
    to={`/${type}s/${id}`}
  >
    <FontAwesomeIcon icon={faChevronRight} className={(context === 'searchBar') ? styles.colorB : styles.colorA} />
  </Link>
);

DrillButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  context: PropTypes.string.isRequired,
};

export default DrillButton;
