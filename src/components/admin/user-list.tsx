"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import type { User } from '@/types/user';


type UserListProps = {
  users: User[];
  isLoading: boolean;
};

const MOCK_TENANT_ID = 'VeraMine';

const statusColors: Record<User['status'], string> = {
    'active': 'bg-green-500/20 text-green-400 border-green-500/30',
    'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'disabled': 'bg-red-500/20 text-red-500 border-red-500/30'
}

export function UserList({ users, isLoading }: UserListProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleUpdateUserStatus = (userId: string, status: User['status']) => {
    if (!firestore) return;
    const userDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'users', userId);
    updateDocumentNonBlocking(userDocRef, { status });
    toast({
      title: 'User status updated',
      description: `The user has been ${status}.`,
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
        </CardTitle>
        <CardDescription>A list of all users in the current tenant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Display Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{user.displayName || '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize border-primary/40">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColors[user.status]} capitalize`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              {user.status === 'pending' && <DropdownMenuItem>Resend Invitation</DropdownMenuItem>}
                              {user.status === 'active' ? (
                                <DropdownMenuItem 
                                  className="text-destructive" 
                                  onClick={() => handleUpdateUserStatus(user.id, 'disabled')}
                                >
                                  Disable User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUpdateUserStatus(user.id, 'active')}>
                                  Enable User
                                </DropdownMenuItem>
                              )}
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
