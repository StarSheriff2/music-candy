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
        {results.map((r) => {
          <SearchResultItem result={r} />;
        // let resultType;
        // if (r.type === 'artist') {
        //   resultType = 'Artist';
        // } else if (r.type === 'master') {
        //   resultType = 'Master Release';
        // } else {
        //   resultType = 'Release';
        // }
        // return (
        //   <li key={r.id} className={styles.resultItem}>
        //     <img
        //       src={(r.thumb === '') ? albumNoArt : r.thumb}
        //       alt="search result thumbnail"
        //       className={styles.thumb}
        //     />
        //     <div className={styles.resultData}>
        //       <h3 className={styles.resultTitle}>
        //         {r.title}
        //         {' '}
        //         <span>{r.year && `(${r.year})`}</span>
        //         {' '}
        //         <span>{r.country && `· ${r.country}`}</span>
        //       </h3>
        //       <p className={styles.resultType}>{resultType}</p>
        //     </div>
        //     <div className="d-flex">
        //       <p className="chevron">›</p>
        //     </div>
        //   </li>
        // );
        })}
        <hr />
        <span>{`${(page !== pages) ? (page - 1) * 50 + 1 : (items - ((page - 1) * 50)) + 1} – ${(items >= 50) ? 50 : items} of ${items}`}</span>
        <span>
          ‹ Prev
          <a href="#" onClick={handleNextClick}>Next ›</a>
        </span>
      </>
    );
};

export default SearchResults;
