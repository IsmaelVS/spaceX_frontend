import axios from 'axios';

const api = axios.create({
  baseURL: 'https://django-spacex.herokuapp.com/'
});

export default api;
