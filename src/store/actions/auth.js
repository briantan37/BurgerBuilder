import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}