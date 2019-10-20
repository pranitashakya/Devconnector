//purpose of it is we are triggerin an action from here
import { GET_ERRORS,SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//actions are events. 
//Actions send data from the application(user interactions, internal events such as API calls, and form submissions) to the store

//we can handle other verbs such as POST and PUT in a similar fashion. 
//Let's create a form that allows for user input and subsequently POST the contetn to an API
//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
   //save the token to localstorage
    //deconstructor
    //const { token } = res.data.token
export const loginUser = userData => dispatch => {
  axios.post('api/users/login', userData).then(res => {
     const { token } = res.data;
    localStorage.setItem('jwtToken', token)
    //set token to auth header
    setAuthToken(token);
    //decode token to get user data
    const decoded = jwt_decode(token);
    //store user data in dispatch
    dispatch(setCurrentUser(decoded));
  })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');
  //remove token from auth header
  setAuthToken(false);
  //clear token from 
  dispatch(setCurrentUser({}));
};
// this.setState({
//   errors: err.response.data
// })