/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import useFetchResults from '../../hooks/fetchResults';
import { search } from '../../slices/discogsSearch';
import SearchResultItem from '../../common/SearchResultItem/SearchResultItem';
// import albumNoArt from '../../common/no-album-art.jpeg';
// import styles from './SearchResults.module.scss';

const SearchResults = ({ results, pagination }) => {
  const dispatch = useDispatch();

  const {
    page, pages, items, per_page, urls,
  } = pagination;

  let paginationData;

  if (pages === 1) {
    paginationData = `1 - ${items}`;
  } else {
    paginationData = `${(page - 1) * per_page + 1} - ${(page !== pages) ? page * per_page : items}`;
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

  // const handlePrevClick = () => {
  //   let params = new URLSearchParams(urls.prev);
  //   params = Object.values(Object.fromEntries(params.entries()));
  //   dispatch(search({
  //     slug: params[0], type: params[1], page: page - 1,
  //   }));
  // };

  return (
    <>
      {results.map((r) => <SearchResultItem key={r.id} result={r} />)}
      <hr />
      <span>{`${paginationData} of ${items}`}</span>
      <span />
      <span>
        <button type="button" data-button="prev" onClick={handleClick}>‹ Prev</button>
        <button type="button" data-button="next" onClick={handleClick}>Next ›</button>
      </span>
    </>
  );
};

export default SearchResults;
