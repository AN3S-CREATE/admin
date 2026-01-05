'use client';

import { PageHeader } from '@/components/shared/page-header';
import { AlertRuleGenerator } from '@/components/alerts/alert-rule-generator';
import { AlertRuleList } from '@/components/alerts/alert-rule-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing } from 'lucide-react';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function AlertsPage() {
  const firestore = useFirestore();

  const alertRulesColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
  }, [firestore]);

  const { data: alertRules, isLoading } = useCollection(alertRulesColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Alerts Engine"
        description="Configure, test, and manage alert rules for your operation."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AlertRuleGenerator />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <AlertRuleList alertRules={alertRules || []} isLoading={isLoading} />
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-6 w-6" />
                Active Alerts Inbox
              </CardTitle>
              <CardDescription>
                A real-time view of all triggered alerts requiring attention.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
              <p>The active alerts inbox will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
