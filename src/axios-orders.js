import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-5a695-default-rtdb.firebaseio.com/'
});

export default instance;
