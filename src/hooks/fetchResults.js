import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { search } from '../slices/discogsSearch';

const useFetchResults = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  useEffect(() => {
    let timeoutId;

    if (query !== '') {
      timeoutId = setTimeout(() => {
        dispatch(search({ query }));
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { query, setQuery };
};

export default useFetchResults;
