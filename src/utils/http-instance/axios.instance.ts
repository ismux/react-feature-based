import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { _urlApiBase } from "../http-core/service.const.ts";
import { getTokenFromStorage, setStorageToken } from "../token-storage/token.store.ts";
import { refreshToken } from '../../services/authServices.ts';

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const api = axios.create({
    baseURL: _urlApiBase
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const tokens = getTokenFromStorage();
    if (!config.headers.Authorization 
     && tokens 
     && !config.url?.includes("/token/refresh")) {
        config.headers.Authorization = `Bearer ${tokens.token}`;
    }
    if (config.data) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
},
    (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(response => response,
    async (error: AxiosError) => {

        const originalRequest = error.config as InternalAxiosRequestConfig
            & { _retry?: boolean };

        // Evitar bucle si el REFRESH falla
        if (originalRequest.url?.includes("/token/refresh")) {
            return Promise.reject(error);
        }

        debugger;
        const tokenExpired = error.response?.headers['Token-Expired'];
        console.log("Token expired:", tokenExpired);

        if (error.response?.status === 401  
        && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    pendingRequests.push((newToken: string) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            try {
                isRefreshing = true;
                const newTokens = await refreshToken();

                if (newTokens && newTokens.token && newTokens.refreshToken) {
                    setStorageToken(newTokens.token, newTokens.refreshToken, null);

                    // Despertar todas las peticiones pendientes
                    pendingRequests.forEach((cb) => cb(newTokens.token));
                    pendingRequests = [];
                    isRefreshing = false;

                    // Reintentar la original
                    originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;
                    return api(originalRequest);
                }
            }
            catch (err) {
                isRefreshing = false;
                pendingRequests = [];
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
)

export default api