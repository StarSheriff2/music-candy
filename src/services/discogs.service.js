/* eslint-disable camelcase */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_DISCOGS_URL,
  headers: {
    Authorization: `OAuth oauth_consumer_key="${process.env.REACT_APP_CONSUMER_KEY}",oauth_nonce="${+new Date()}",oauth_token="${process.env.REACT_APP_OAUTH_TOKEN}",oauth_signature="${process.env.REACT_APP_CONSUMER_SECRET}&${process.env.REACT_APP_OAUTH_TOKEN_SECRET}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${+new Date()}"`,
    'User-Agent': `${process.env.REACT_APP_USER_AGENT}`,
  },
});

const search = ({
  slug, type, page, perPage,
}) => api.get(`database/search?q=${slug}&type=${type}&page=${page}&per_page=${perPage}`);

const getCollection = (sort) => api.get(`users/${process.env.REACT_APP_DISCOGS_USER}/collection/folders/0/releases?sort=${sort}&sort_order=asc`);

const addToCollection = (releaseId) => api.post(`/users/${process.env.REACT_APP_DISCOGS_USER}/collection/folders/1/releases/${releaseId}`);

const getArtistInfo = (id) => api.get(`artists/${id}`);

const getArtistReleases = (id, page = null) => api.get(`artists/${id}/releases?page=${page}&sort=year&sort_order=asc`);

// For upcoming features:

// const getReleaseInfo = ( id ) => api.get(`masters/${id}`);

// const getReleaseVersions = ( id ) => api.get(`masters/${id}/versions`);

const getVersionDetails = (id) => api.get(`releases/${id}`);

const discogsApiService = {
  getCollection,
  search,
  getArtistInfo,
  getArtistReleases,
  getVersionDetails,
  addToCollection,
};

export default discogsApiService;
