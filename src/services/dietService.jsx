async function createDietPlan(dietData) {
    try {
        const response = await fetch('http://localhost:8081/diets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dietData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function getDietPlanByUserId(userId) {
    const response = await fetch(`http://localhost:8081/diets/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Diet plan not found');
    }

    return response.json();
}

export { createDietPlan, getDietPlanByUserId };