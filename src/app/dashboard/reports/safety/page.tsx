'use client';

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import { IncidentList } from "@/components/risk/incident-list";
import { useToast } from "@/hooks/use-toast";

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function SafetyReportPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const incidentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection(incidentsColRef);
  
  const handleExport = () => {
    toast({
      title: 'Export to CSV',
      description: 'This feature is a placeholder in the prototype.',
    });
  };

  return (
    <div className="space-y-8">
       <PageHeader
        title="Safety Scorecard"
        description="An overview of safety performance, including incident rates and compliance status."
      >
        <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </PageHeader>
      
      <IncidentList incidents={incidents || []} isLoading={isLoading} />
      
    </div>
  );
}
