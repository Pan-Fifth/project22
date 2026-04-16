import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3500/auth",
    withCredentials: true
});

authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

authApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            console.log("Unauthorized → redirect login");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default authApi;