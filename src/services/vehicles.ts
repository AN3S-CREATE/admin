'use server';

import { getFirestore, collection, query, where, getDocs, limit, orderBy, QueryConstraint } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Vehicle } from '@/types/transport';

const MOCK_TENANT_ID = 'VeraMine';

/**
 * Fetches vehicles from Firestore.
 * This is a server-side function intended to be used by AI tools.
 */
export async function getVehicles(
    filters: { type?: Vehicle['type'], status?: Vehicle['status'] }, 
    queryLimit = 10
): Promise<Partial<Vehicle>[]> {
  try {
    const { firestore } = initializeFirebase();
    const vehiclesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles');
    
    const queryConstraints: QueryConstraint[] = [limit(queryLimit)];

    if (filters.type) {
      queryConstraints.push(where('type', '==', filters.type));
    }
    if (filters.status) {
        queryConstraints.push(where('status', '==', filters.status));
    }

    const q = query(vehiclesColRef, ...queryConstraints);

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }

    const vehicles = snapshot.docs.map(doc => {
      const data = doc.data() as Vehicle;
      return {
        id: doc.id,
        type: data.type,
        status: data.status,
        driver: data.driver
      };
    });

    return vehicles;

  } catch (error) {
    console.error("Error fetching vehicles:", error);
    // In case of an error, return an empty array to the AI
    // so it can report that it couldn't retrieve the data.
    return [];
  }
}
