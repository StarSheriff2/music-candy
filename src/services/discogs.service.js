/* eslint-disable camelcase */
import axios from 'axios';

const discogsApiInstance = axios.create({
  baseURL: process.env.REACT_APP_DISCOGS_URL,
  headers: {
    Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
  },
});

const search = ({ query, type = null }) => discogsApiInstance.get(`database/search?q=${query}&type=${type}`);

// const searchBy = ({ query, type }) =>
// discogsApiInstance.get(`database/search?q=${query}&type=${type}`);

// search by artist https://api.discogs.com/database/search?q=room+full+of+walters&type=artist
// search by release https://api.discogs.com/database/search?q=master+of+puppets&type=release
// by album https://api.discogs.com/database/search?q=master+of+puppets&type=release&format=album

const discogsApiService = {
  search,
};

export default discogsApiService;
