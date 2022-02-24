import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import discogsApiService from '../services/discogs.service';
import { setMessage, clearMessage } from '../slices/message';

const useFetchResults = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    query: {
      slug: '',
      type: null,
      page: null,
      perPage: 15,
    },

    results: [],
  });

  let timeoutId;

  useEffect(() => {
    if (data.query.slug !== '') {
      timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await discogsApiService.search(data.query);
            setData({ ...data, results: res.data.results });
          } catch (error) {
            const message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();
            dispatch(setMessage(message));
          }
        };
        fetch();
      }, 1000);
    } else {
      clearTimeout(timeoutId);
      setData((prevData) => ({ ...prevData, results: [] }));
    }

    return () => {
      clearTimeout(timeoutId);
      dispatch(clearMessage());
    };
  }, [data.query.slug, data.query.type]);

  const cancelScheduledFetch = () => clearTimeout(timeoutId);

  return { data, setData, cancelScheduledFetch };
};

export default useFetchResults;
