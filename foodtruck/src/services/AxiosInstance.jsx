import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const AxiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
});

export default AxiosInstance;