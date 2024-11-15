import axios from 'axios';
import queryString from 'query-string'; // parse param to object 


// const baseURL = "http://localhost:5000/api/v1/";
const baseURL = "https://phobypho.onrender.com/api/v1/";


const publicClient = axios.create({
     baseURL,
     withCredentials: true, // Thêm dòng này
     paramsSerializer: {
          encode: params => queryString.stringify(params)
     },
});

publicClient.interceptors.request.use(async config => {
     return {
          ...config,
          headers: {
               "Content-Type": "application/json"
          }
     };
});

publicClient.interceptors.response.use((response) => {
     if (response && response.data) return response.data;
     return response;
}, (err) => {
     throw err.response.data;
});


export default publicClient;