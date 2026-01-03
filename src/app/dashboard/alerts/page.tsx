'use client';

import { PageHeader } from '@/components/shared/page-header';
import { AlertRuleGenerator } from '@/components/alerts/alert-rule-generator';
import { AlertRuleList } from '@/components/alerts/alert-rule-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

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
        <div className="lg:col-span-2">
          <AlertRuleList alertRules={alertRules || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
