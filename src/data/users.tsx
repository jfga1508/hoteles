import { useState } from 'react';
const api = import.meta.env.VITE_API_URL + '/api';

export const loginUser = async (credentials: object) => {
    const data = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());

    return data;
};

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString) : '';
        return userToken?.token;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: any) => {
        console.log(userToken.token);
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token,
    };
}
