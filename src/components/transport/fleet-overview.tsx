'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Truck, Shovel, Construction, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import type { Vehicle } from '@/types/transport';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
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

type FleetOverviewProps = {
  vehicles: Vehicle[];
  isLoading: boolean;
  onEdit: (vehicle: Vehicle) => void;
};

const statusColors: Record<Vehicle['status'], string> = {
  'On Route': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Idle': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Maintenance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Offline': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const vehicleTypeIcons: Record<Vehicle['type'], React.ElementType> = {
    'Haul Truck': Truck,
    'Light Vehicle': Truck, // Could use a car icon if available
    'Excavator': Shovel,
    'Dozer': Construction,
};

const MOCK_TENANT_ID = 'VeraMine';

export function FleetOverview({ vehicles, isLoading, onEdit }: FleetOverviewProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const handleDelete = () => {
    if (!firestore || !vehicleToDelete) return;
    const vehicleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles', vehicleToDelete.id);
    deleteDocumentNonBlocking(vehicleDocRef);
    toast({
        title: 'Vehicle Deleted',
        description: `Vehicle ${vehicleToDelete.id} has been removed from the fleet.`,
    });
    setVehicleToDelete(null);
  };


  return (
    <>
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6"/>
            Fleet Overview
        </CardTitle>
        <CardDescription>A real-time overview of all vehicles in the fleet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : vehicles.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No vehicles found.
                    </TableCell>
                </TableRow>
            ) : (
              vehicles.map((vehicle) => {
                const Icon = vehicleTypeIcons[vehicle.type] || Truck;
                return (
                  <TableRow key={vehicle.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        {vehicle.id}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[vehicle.status]} w-28 justify-center`}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${vehicle.driver.id}`} alt={vehicle.driver.name} />
                              <AvatarFallback>{vehicle.driver.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{vehicle.driver.name}</span>
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
                          <DropdownMenuItem onClick={() => onEdit(vehicle)}>Edit Vehicle</DropdownMenuItem>
                          <DropdownMenuItem>Assign New Trip</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => setVehicleToDelete(vehicle)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Vehicle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <AlertDialog open={!!vehicleToDelete} onOpenChange={(open) => !open && setVehicleToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete vehicle 
            <span className="font-bold"> "{vehicleToDelete?.id}"</span> from the fleet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
