'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Truck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { Vehicle } from '@/lib/transport-data';

type FleetOverviewProps = {
  vehicles: Vehicle[];
};

const statusColors: Record<Vehicle['status'], string> = {
  'On Route': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Idle': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Maintenance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Offline': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const vehicleTypeIcons: Record<Vehicle['type'], React.ElementType> = {
    'Haul Truck': Truck,
    'Light Vehicle': Truck,
    'Excavator': Truck,
    'Dozer': Truck,
};

export function FleetOverview({ vehicles }: FleetOverviewProps) {
  return (
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
              <TableHead>Current Trip/Assignment</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => {
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
                  <TableCell className="text-muted-foreground">{vehicle.currentTrip || 'N/A'}</TableCell>
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
                        <DropdownMenuItem>View Live Location</DropdownMenuItem>
                        <DropdownMenuItem>Assign New Trip</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
