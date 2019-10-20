import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    //apply authorizatio token to every request if logged in the axios.
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
