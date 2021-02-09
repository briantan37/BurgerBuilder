import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureData: true
        }
        let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_KEY;
        if (!isSignup) {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_KEY;
        }
        console.log(authURL);
        axios.post(authURL, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}