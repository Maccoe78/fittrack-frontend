
async function loginUser(name, password) {
    try {
        const response = await fetch('http://localhost:8081/users/login', {
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

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
async function registerUser(name, password) {
    try {
        const response = await fetch('http://localhost:8081/users', {
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

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export { loginUser, registerUser };