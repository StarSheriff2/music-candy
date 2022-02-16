/* eslint-disable camelcase */
import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_DISCOGS_URL,
//   headers: {
//     Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
//     "User-Agent": 'arturo.coder2020@gmail.com',
//   },
// });

const api = axios.create({
  baseURL: process.env.REACT_APP_DISCOGS_URL,
  headers: {
    Authorization: `OAuth oauth_consumer_key="${process.env.REACT_APP_CONSUMER_KEY}",oauth_nonce="${+new Date()}",oauth_token="${process.env.REACT_APP_OAUTH_TOKEN}",oauth_signature="${process.env.REACT_APP_CONSUMER_SECRET}&${process.env.REACT_APP_OAUTH_TOKEN_SECRET}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${+new Date()}"`,
    'User-Agent': `${process.env.REACT_APP_USER_AGENT}`,
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

// timespatm: new Date(Date.now())

// Request Token Step: GET https://api.discogs.com/oauth/request_token
// OAuth oauth_consumer_key="zNJKbGySmYUQueutkdxW",oauth_nonce="1644990321902",oauth_signature="SlheoiWwAxTTYodFSMhvKDjUYnClhbCJ&",oauth_signature_method="PLAINTEXT",oauth_timestamp="1644990321902",oauth_callback="http://localhost:3000"

// This step is donde once only it seems. It returns the verifier token:
// https://discogs.com/oauth/authorize?oauth_token=<your_oauth_request_token>

// This generates the access token: POST https://api.discogs.com/oauth/access_token
// OAuth oauth_consumer_key="zNJKbGySmYUQueutkdxW",oauth_nonce="1644993161221",oauth_token="HYIwfjyWFGlAKIrOgRSpPXeKErxtEQRxlVgHJjzu",oauth_signature="SlheoiWwAxTTYodFSMhvKDjUYnClhbCJ&mtSSTPvaaBoxhChSMJLlIBFAufeOyOdAWvFiQvla",oauth_signature_method="PLAINTEXT",oauth_timestamp="1644993161221",oauth_verifier="yrRCXXupNC"
// OAuth oauth_consumer_key="zNJKbGySmYUQueutkdxW",oauth_nonce="1644993161221",oauth_token="HYIwfjyWFGlAKIrOgRSpPXeKErxtEQRxlVgHJjzu",oauth_signature="<consumer_Key>&<oauth_token_secre_from_request_token_step>",oauth_signature_method="PLAINTEXT",oauth_timestamp="1644993161221",oauth_verifier="yrRCXXupNC"

// My Credentials:
// oauth_token=bntGjbfaDtEHAaGHyZwGhhgAPLCRCzMhdOsnSOon&oauth_token_secret=IHPOLPXipkykHuurLYVPFWfhRlxSpthDRXNABMnk

// Send Authtneticated requests:
// OAuth oauth_consumer_key="zNJKbGySmYUQueutkdxW",oauth_nonce="1644995976632",oauth_token="bntGjbfaDtEHAaGHyZwGhhgAPLCRCzMhdOsnSOon",oauth_signature="SlheoiWwAxTTYodFSMhvKDjUYnClhbCJ&IHPOLPXipkykHuurLYVPFWfhRlxSpthDRXNABMnk",oauth_signature_method="PLAINTEXT",oauth_timestamp="1644995976632"

const discogsApiService = {
  search,
  getArtistInfo,
  getArtistReleases,
  getReleaseInfo,
  getReleaseVersions,
  getVersionDetails,
};

export default discogsApiService;
