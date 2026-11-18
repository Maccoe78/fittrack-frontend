import { API_URL } from './apiConfig.js';

function getAuthHeaders() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        throw new Error('You are not logged in. Log in again.');
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
    });

    if (response.status === 401) {
        throw new Error('Your session has expired. Log in again.');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.message ||
            errorData?.detail ||
            `Request failed (${response.status})`
        );
    }

    return response.json();
}

function getTodayFoodSummary() {
    return request('/food-entries/today/summary');
}

function getFoodEntriesByDate(date) {
    return request(`/food-entries?date=${encodeURIComponent(date)}`);
}

function addFoodEntry(foodName, calories) {
    return request('/food-entries', {
        method: 'POST',
        body: JSON.stringify({ foodName, calories }),
    });
}

export { getTodayFoodSummary, getFoodEntriesByDate, addFoodEntry };