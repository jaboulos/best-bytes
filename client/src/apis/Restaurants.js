import axios from 'axios';

// create axios instance
export default axios.create({
  // url of BE server
  baseURL: 'http://localhost:5000/api/v1/restaurants',
});
