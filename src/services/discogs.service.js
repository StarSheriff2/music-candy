/* eslint-disable camelcase */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_DISCOGS_URL,
  headers: {
    Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
  },
});

const search = ({ query, type = null }) => api.get(`database/search?q=${query}&type=${type}`);

const getArtistInfo = ({ id }) => api.get(`artists/${id}`);

const getArtistReleases = ({ id }) => api.get(`artists/${id}/releases?sort=year&sort_order=desc`)
  .filter((r) => r.type === 'master');

const getReleaseInfo = ({ id }) => api.get(`masters/${id}`);

const getReleaseVersions = ({ id }) => api.get(`masters/${id}/versions`);

const getVersionDetails = ({ id }) => api.get(`releases/${id}`);

// const searchBy = ({ query, type }) =>
// discogsApiInstance.get(`database/search?q=${query}&type=${type}`);

// search by artist https://api.discogs.com/database/search?q=room+full+of+walters&type=artist
// search by release https://api.discogs.com/database/search?q=master+of+puppets&type=release
// by album https://api.discogs.com/database/search?q=master+of+puppets&type=release&format=album

const discogsApiService = {
  search,
  getArtistInfo,
  getArtistReleases,
  getReleaseInfo,
  getReleaseVersions,
  getVersionDetails,
};

export default discogsApiService;
