import axios from 'axios';

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.token;
  }
};

export default setAuthToken;
