'use client';

import { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged, type User as FirebaseAuthUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import type { User as AppUser } from '@/types/user';
import { MOCK_USERS } from '@/lib/mock-users';

export interface UseUserResult {
  user: (AppUser & { uid: string }) | null;
  isUserLoading: boolean;
  userError: Error | null;
}

const MOCK_TENANT_ID = 'Veralogix';

export function useUser(): UseUserResult {
  const auth = useAuth();
  const firestore = useFirestore();
  
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for Mock Mode via local storage (set by Playwright)
    // We check this first to bypass Firebase auth entirely if needed for screenshots
    // ONLY ENABLE IN DEVELOPMENT
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        const mockRole = localStorage.getItem('MOCK_ROLE');
        if (mockRole && MOCK_USERS[mockRole as keyof typeof MOCK_USERS]) {
            // @ts-ignore
            setFirebaseUser({ uid: MOCK_USERS[mockRole as keyof typeof MOCK_USERS].uid } as FirebaseAuthUser);
            // @ts-ignore
            setProfile(MOCK_USERS[mockRole as keyof typeof MOCK_USERS]);
            setIsLoading(false);
            return;
        }
    }

    if (!auth) {
      setIsLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setFirebaseUser(user);
        if (!user) {
          setProfile(null);
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Auth state error:", err);
        setError(err);
        setFirebaseUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !firebaseUser) return null;
    // In a real multi-tenant app, the tenantId would be determined dynamically
    // (e.g., from a subdomain, a previous selection, or user's custom claims).
    // For this prototype, we'll use a mocked tenant ID.
    return doc(firestore, 'tenants', MOCK_TENANT_ID, 'users', firebaseUser.uid);
  }, [firestore, firebaseUser]);

  useEffect(() => {
    if (!userDocRef) {
      if (!firebaseUser) {
        setIsLoading(false);
      }
      return;
    }
    
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as AppUser);
        } else {
          // Handle cases where user exists in Auth but not Firestore
          // This could be a new user, or a guest.
          if (firebaseUser?.isAnonymous) {
            setProfile({
              id: firebaseUser.uid,
              tenantId: MOCK_TENANT_ID,
              email: 'guest@veralogix.com',
              displayName: 'Guest User',
              role: 'viewer',
              status: 'active'
            });
          } else {
             console.warn(`No profile found for user ${firebaseUser?.uid} in tenant ${MOCK_TENANT_ID}`);
             // For demo purposes, create a temporary profile if one doesn't exist
             setProfile({
                id: firebaseUser?.uid || '',
                tenantId: MOCK_TENANT_ID,
                email: firebaseUser?.email || '',
                displayName: firebaseUser?.displayName || 'Demo User',
                role: 'admin', // Default to admin for demo ease
                status: 'active'
             });
          }
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Firestore profile snapshot error:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userDocRef, firebaseUser]);
  
  const user = useMemo(() => {
    if (!firebaseUser || !profile) return null;
    return {
      ...profile,
      uid: firebaseUser.uid,
    };
  }, [firebaseUser, profile]);

  return { user, isUserLoading: isLoading, userError: error };
}
