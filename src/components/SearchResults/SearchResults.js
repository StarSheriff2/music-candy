/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
import PaginationButtons from '../../common/PaginationButtons/PaginationButtons';

const SearchResults = ({ results, pagination }) => {

  return (
    <>
      {results.map((r) => <SearchResultItem key={r.id} result={r} />)}
      <hr />
      <PaginationButtons pagination={pagination} paginationOrigin={'search'} ></PaginationButtons>
    </>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    Object,
  })).isRequired,
  pagination: PropTypes.shape(
    null,
  ).isRequired,
};

export default SearchResults;
