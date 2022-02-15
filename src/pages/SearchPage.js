import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearMessage } from '../slices/message';

const SearchPage = () => {
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div>
      <h1>Music Candy</h1>
      <div>
        <input type="search" placeholder="search any release" />
      </div>
      <div>
        Search Results component
      </div>
      <div>
        MY Collection
      </div>

      {message && (
      <div className="alert alert-info" role="alert">
        {message}
      </div>
      )}
    </div>
  );
};

export default SearchPage;
