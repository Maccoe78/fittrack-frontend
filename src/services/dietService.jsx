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

async function createDietPlan(dietData) {
    const response = await fetch(`${API_URL}/diets`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(dietData),
    });

    if (response.status === 401) {
        throw new Error('Your session has expired. Log in again.');
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
}

async function getDietPlanByUserId(userId) {
    const response = await fetch(`${API_URL}/diets/user/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (response.status === 401) {
        throw new Error('Your session has expired. Log in again.');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Diet plan not found');
    }

    return response.json();
}

export { createDietPlan, getDietPlanByUserId };