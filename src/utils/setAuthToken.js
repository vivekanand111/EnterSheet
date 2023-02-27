import apiClient from "../config/api";

const setAuthToken = (token) => {
   if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
   } else {
      console.log('Remove auth header...');
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
   }
};

export default setAuthToken;
