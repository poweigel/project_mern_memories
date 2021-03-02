import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
  // Use trycatch whenever we're in an async block of code.
  try {
    // Log in the user.
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    
    history.push('/');    // After we log in the user, push to the home page.
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  // Use trycatch whenever we're in an async block of code.
  try {
    // Sign up the user.
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    
    history.push('/');    // After we log in the user, push to the home page.
  } catch (error) {
    console.log(error);
  }
}