'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

type PeopleListProps = {
  users: User[];
  isLoading: boolean;
};

const statusColors: Record<User['status'], string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  disabled: 'bg-red-500/20 text-red-500 border-red-500/30',
};

// Helper to get a consistent "random" compliance value for a user
const getComplianceValue = (userId: string) => {
    // Simple hash function to get a value between 0 and 100
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        const char = userId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 71) + 30; // Return a value between 30 and 100
}

export function PeopleList({ users, isLoading }: PeopleListProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>People Profiles</CardTitle>
        <CardDescription>A list of all personnel in the tenant, with their compliance status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className='space-y-1'>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                   <TableCell>
                    <Skeleton className="h-5 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => {
                const compliance = getComplianceValue(user.id);
                return (
                    <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.displayName?.charAt(0) ?? user.email.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{user.displayName || '-'}</p>
                            <p className='text-xs text-muted-foreground'>{user.email}</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className="capitalize border-primary/40">
                        {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={`${statusColors[user.status]} capitalize`}>
                        {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className='flex items-center gap-2'>
                            <Progress value={compliance} className='w-24 h-2' />
                            <Badge variant='secondary' className='w-14 justify-center'>{compliance}%</Badge>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Training Records</DropdownMenuItem>
                            <DropdownMenuItem>Manage Compliance</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
