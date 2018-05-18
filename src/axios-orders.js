import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgers-7e653.firebaseio.com/'
});

export default instance;
