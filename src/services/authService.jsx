import { API_URL } from './apiConfig.js';

async function loginUser(name, password) {

    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
}

async function registerUser(name, password) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
}

async function profileRequest(path, options = {}) {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed (${response.status})`);
    }

    if (response.status === 204) return null;
    return response.json();
}

function getMyProfile() {
    return profileRequest('/users/me');
}

function updateMyProfile(data) {
    return profileRequest('/users/me', {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

function deleteMyAccount(currentPassword) {
    return profileRequest('/users/me', {
        method: 'DELETE',
        body: JSON.stringify({ currentPassword }),
    });
}

export { loginUser, registerUser, getMyProfile, updateMyProfile, deleteMyAccount };