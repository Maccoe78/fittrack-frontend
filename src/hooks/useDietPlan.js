import { useEffect, useState } from 'react';
import { getDietPlanByUserId } from '../services/dietService';

function useDietPlan() {
    const [dietPlan, setDietPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('loggedInUserId');

    useEffect(() => {
        const load = async () => {
            try {
                if (!userId) return;
                const data = await getDietPlanByUserId(userId);
                setDietPlan(data);
            } catch {
                setDietPlan(null);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [userId]);

    return { dietPlan, loading };
}

export default useDietPlan;