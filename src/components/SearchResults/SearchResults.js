/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
import PaginationButtons from '../../common/PaginationButtons/PaginationButtons';
import styles from './SearchResults.module.scss';

const SearchResults = ({ results, pagination, context }) => (
  <div className="text-start">
    {results.map((r) => {
      if (r.type !== 'release') {
        return (
          <Link
            className={styles.link}
            to={`/${r.type}s/${r.id}`}
            key={r.id}
          >
            <SearchResultItem result={r} context={context} />
          </Link>
        );
      }
      return (<SearchResultItem key={r.id} result={r} context={context} />);
    })}
    {pagination && (
      <>
        <hr />
        <PaginationButtons pagination={pagination} paginationOrigin="search" />
        <hr />
      </>
    )}
  </div>
);

SearchResults.defaultProps = {
  pagination: null,
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    Object,
  })).isRequired,
  pagination: PropTypes.shape(
    null,
  ),
  context: PropTypes.string.isRequired,
};

export default SearchResults;
