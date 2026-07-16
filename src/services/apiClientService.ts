import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.COUNTRY_API_KEY,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// // Interceptor: agregar token (equivalente a un HttpInterceptor de Angular)
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// // Interceptor de errores centralizado
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // redirigir a login, limpiar sesión, etc.
//         }
//         return Promise.reject(error);
//     }
// );