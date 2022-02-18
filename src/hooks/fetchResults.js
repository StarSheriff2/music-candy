import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { search } from '../slices/discogsSearch';

const useFetchResults = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    slug: '',
    type: null,
    page: null,
  });

  useEffect(() => {
    let timeoutId;

    if (query.slug !== '') {
      timeoutId = setTimeout(() => {
        dispatch(search(query));
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [query.slug, query.type]);

  return { query, setQuery };
};

export default useFetchResults;
