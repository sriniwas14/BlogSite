import axios from 'axios'
 
const instance = axios.create({
    baseURL: 'http://localhost:2997',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;