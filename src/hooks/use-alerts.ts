'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const MOCK_TENANT_ID = 'Veralogix';

export type ActiveAlert = {
    id: string;
    name: string;
    triggeredAt: string;
    // In a real system, you'd have more details
};

export function useAlerts() {
    const firestore = useFirestore();

    // In a real app, you would likely have a separate 'activeAlerts' collection.
    // For this prototype, we'll simulate active alerts by querying for *enabled* rules
    // and transforming them into an "active alert" shape.
    const activeAlertsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        const rulesRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
        return query(rulesRef, where('enabled', '==', true));
    }, [firestore]);

    const { data: enabledRules, isLoading, error } = useCollection(activeAlertsQuery);

    const alerts: ActiveAlert[] = useMemo(() => {
        if (!enabledRules) return [];
        // Transform the rule data into the ActiveAlert shape
        return enabledRules.map(rule => ({
            id: rule.id,
            name: rule.name,
            // Use a semi-random but consistent time for the prototype
            triggeredAt: new Date(Date.now() - (rule.name.length * 60 * 1000)).toISOString(),
        }));
    }, [enabledRules]);


    return { alerts, isLoading, error };
}
