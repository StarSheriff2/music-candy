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
    page, pages, items, urls,
  } = pagination;

    <span>{`${(page !== pages) ? (page - 1) * 50 + 1 : (items - ((page - 1) * 50)) + 1} – ${(items >= 50) ? 50 : items} of ${items}`}</span>;

    // const { query, setQuery } = useFetchResults();

    const handleNextClick = (e) => {
      e.preventDefault();
      // console.log('urls.next: ', urls.next)
      let params = new URLSearchParams(urls.next);
      params = Object.values(Object.fromEntries(params.entries()));
      dispatch(search({
        slug: params[0], type: params[1], page: page + 1,
      }));
    // setQuery({ ...query, page: page + 1 });
    };

    return (
      <>
        {results.map((r) => <SearchResultItem key={r.id} result={r} />)}
        <hr />
        <span>{`${(page !== pages) ? (page - 1) * 50 + 1 : (items - ((page - 1) * 50)) + 1} – ${(items >= 50) ? 50 : items} of ${items}`}</span>
        <span>
          ‹ Prev
          {/* <a href="#" onClick={handleNextClick}>Next ›</a> */}
        </span>
      </>
    );
};

export default SearchResults;
