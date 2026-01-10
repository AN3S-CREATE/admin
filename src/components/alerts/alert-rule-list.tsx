'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Switch } from '../ui/switch';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export type AlertRule = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  configuration: string;
  enabled: boolean;
};

type AlertRuleListProps = {
  alertRules: AlertRule[];
  isLoading: boolean;
};

const MOCK_TENANT_ID = 'Veralogix';

export function AlertRuleList({ alertRules, isLoading }: AlertRuleListProps) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [ruleToDelete, setRuleToDelete] = useState<AlertRule | null>(null);
    
    const handleToggleRule = (rule: AlertRule) => {
        if (!firestore) return;
        const ruleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules', rule.id);
        const newStatus = !rule.enabled;
        updateDocumentNonBlocking(ruleDocRef, { enabled: newStatus });
        toast({
            title: `Rule ${newStatus ? 'Enabled' : 'Disabled'}`,
            description: `"${rule.name}" is now ${newStatus ? 'active' : 'inactive'}.`
        });
    };

    const handleDeleteRule = () => {
        if (!firestore || !ruleToDelete) return;
        const ruleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules', ruleToDelete.id);
        deleteDocumentNonBlocking(ruleDocRef);
        toast({
            title: 'Rule Deleted',
            description: `The rule "${ruleToDelete.name}" has been deleted.`,
        });
        setRuleToDelete(null);
    };

  return (
    <>
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Existing Alert Rules</CardTitle>
        <CardDescription>A list of all configured alert rules for the tenant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-2/3" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : alertRules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No alert rules configured yet.
                </TableCell>
              </TableRow>
            ) : (
              alertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-sm truncate">{rule.description}</TableCell>
                  <TableCell>
                    <Badge variant={rule.enabled ? 'default' : 'outline'} className={rule.enabled ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => handleToggleRule(rule)}
                            aria-label="Toggle rule"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Rule</DropdownMenuItem>
                                <DropdownMenuItem>Test Rule</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => setRuleToDelete(rule)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Rule
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
     <AlertDialog open={!!ruleToDelete} onOpenChange={(open) => !open && setRuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the alert rule
              <span className="font-bold"> "{ruleToDelete?.name}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRule} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
