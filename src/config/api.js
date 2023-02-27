import axios from "axios";
import store from "../store/store";
import { logout } from "../store/tasksSlice";

let baseURL = import.meta.env.VITE_BASE_URL + '/star-backend/'

const apiClient = axios.create({
    baseURL,
})

apiClient.interceptors.request.use(
    (config) => {
        if (!localStorage.token) {
            //console.log("out")
            store.dispatch(logout());
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.data === 'Unauthorized' && err.response.status >= 400) {
            console.log("Unauthorized")
            store.dispatch(logout());
        }
        return Promise.reject(err);
    }
);
export default apiClient