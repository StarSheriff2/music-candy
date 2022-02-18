import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import discogsApiService from '../services/discogs.service';
import { setMessage } from '../slices/message';

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

  useEffect(() => {
    let timeoutId;

    if (data.query.slug !== '') {
      console.log('query: ', data.query.slug);
      console.log('results: ', data.results);
      timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await discogsApiService.search(data.query);
            console.log('hi');
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
    }

    return () => clearTimeout(timeoutId);
  }, [data.query.slug, data.query.type]);

  return { data, setData };
};

export default useFetchResults;
