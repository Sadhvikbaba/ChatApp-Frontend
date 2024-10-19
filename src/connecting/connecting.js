import axios from "axios";

const apiClient = axios.create({
    headers:{
        'Content-Type' : 'application/json'
    }
})


const handleApiResponse = (apiCall) => {
    return new Promise((resolve, reject) => {
        apiCall
            .then((res) => resolve(res.data))
            .catch((error) => {
                const errorMessage = error.response?.data
                if (errorMessage) reject(errorMessage);
                else reject("unknown error");
            });
    });
};

export const login = (credentials) => handleApiResponse(
    apiClient.post(`/v1/users/login`, {...credentials}, {withCredentials:true})
);

export const logout = () => handleApiResponse(
    apiClient.post(`/v1/users/logout` , {} , {withCredentials : true})
)

export const register = (credentials) => handleApiResponse(
    apiClient.post(`/v1/users/register` , {...credentials} , {withCredentials : true})
);

export const refreshToken = () => handleApiResponse(
    apiClient.post(`/v1/users/refresh-token`, {}, { withCredentials: true })
);

export const getCurrentUser = () => handleApiResponse(
    apiClient.get(`/v1/users/user`, {}, { withCredentials: true })
);

export const getUsers = () => handleApiResponse(
    apiClient.get(`/v1/users/users`, {}, { withCredentials: true })
);

export const sendMessage = (id,message) => handleApiResponse(
    apiClient.post(`/v1/message/send/${id}`, {...message}, { withCredentials: true })
);

export const getMessage = (id) => handleApiResponse(
    apiClient.get(`/v1/message/${id}`, { withCredentials: true })
);