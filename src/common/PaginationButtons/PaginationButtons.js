/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../slices/discogsSearch';
import styles from './PaginationButtons.module.scss';

const PaginationButtons = ({ pagination, paginationOrigin }) => {
  const dispatch = useDispatch();

  const {
    page, pages, items, per_page, urls,
  } = pagination;

  let fromItem = 1;
  let toItem = items;

  if (pages !== 1) {
    fromItem = (page - 1) * per_page + 1;
    if (page !== pages) {
      toItem = page * per_page;
    }
  }

  const handleClick = (e) => {
    const pagBtn = e.target.dataset.button;
    const goToPage = (pagBtn === 'next') ? page + 1 : page - 1;
    let params = new URLSearchParams(urls[pagBtn]);

    params = Object.values(Object.fromEntries(params.entries()));
    dispatch(search({
      slug: params[0], type: params[1], page: goToPage,
    }));
  };

  return (
    <>
      <span>{`${fromItem} - ${toItem} of ${items}`}</span>
      <span />
      <span>
        <button
          className={styles.pageBtn}
          type="button"
          data-button="prev"
          onClick={handleClick}
          disabled={!('prev' in urls)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          {' '}
          Prev
        </button>
        {' '}
        <button
          className={styles.pageBtn}
          type="button"
          data-button="next"
          onClick={handleClick}
          disabled={!('next' in urls)}
        >
          Next
          {' '}
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </span>
    </>
  );
};

PaginationButtons.propTypes = {
  pagination: PropTypes.shape(
    null,
  ).isRequired,
};

export default PaginationButtons;
