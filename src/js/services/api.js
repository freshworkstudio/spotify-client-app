import axios from 'axios';
export default {
  search(query) {
    return axios.get(this.url('search'), {params: {q: query}});
  },

  url(endpoint) {
    return process.env.MIX_API_ENDPOINT + endpoint;
  }
}