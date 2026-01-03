'use client';

import { FirebaseClientProvider } from '@/firebase';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
