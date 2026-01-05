'use server';

import { getFirestore, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Incident } from '@/types/incident';

const MOCK_TENANT_ID = 'VeraMine';

/**
 * Fetches incidents from Firestore.
 * This is a server-side function intended to be used by AI tools.
 */
export async function getIncidents(classification?: string, queryLimit = 5): Promise<Partial<Incident>[]> {
  try {
    const { firestore } = initializeFirebase();
    const incidentsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
    
    let q;
    if (classification) {
      q = query(
        incidentsColRef, 
        where('classification', '==', classification),
        orderBy('date', 'desc'),
        limit(queryLimit)
      );
    } else {
      q = query(incidentsColRef, orderBy('date', 'desc'), limit(queryLimit));
    }

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }

    const incidents = snapshot.docs.map(doc => {
      const data = doc.data() as Incident;
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        classification: data.classification,
        date: data.date,
        status: data.status,
      };
    });

    return incidents;

  } catch (error) {
    console.error("Error fetching incidents:", error);
    // In case of an error, return an empty array to the AI
    // so it can report that it couldn't retrieve the data.
    return [];
  }
}
