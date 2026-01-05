'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Save } from 'lucide-react';
import { useFirestore, useUser, setDocumentNonBlocking } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import type { Vehicle } from '@/types/transport';

const vehicleTypes: Vehicle['type'][] = ["Haul Truck", "Light Vehicle", "Excavator", "Dozer"];
const vehicleStatuses: Vehicle['status'][] = ["On Route", "Idle", "Maintenance", "Offline"];

const MOCK_TENANT_ID = 'VeraMine';

type VehicleFormProps = {
  vehicleToEdit: Vehicle | null;
  onFormClose: () => void;
};

export function VehicleForm({ vehicleToEdit, onFormClose }: VehicleFormProps) {
  const [vehicleId, setVehicleId] = useState('');
  const [type, setType] = useState<Vehicle['type']>('Haul Truck');
  const [status, setStatus] = useState<Vehicle['status']>('Idle');
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const isEditing = !!vehicleToEdit;

  useEffect(() => {
    if (isEditing) {
      setVehicleId(vehicleToEdit.id);
      setType(vehicleToEdit.type);
      setStatus(vehicleToEdit.status);
      setDriverName(vehicleToEdit.driver.name);
      setDriverId(vehicleToEdit.driver.id);
    } else {
      // Reset form when switching from edit to create
      setVehicleId('');
      setType('Haul Truck');
      setStatus('Idle');
      setDriverName('');
      setDriverId('');
    }
  }, [vehicleToEdit, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) return;
    
    if (!vehicleId || !type || !status || !driverName) {
      toast({
        variant: 'destructive',
        title: 'All fields are required',
      });
      return;
    }

    setIsSubmitting(true);

    const vehicleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles', vehicleId);

    const vehicleData: Omit<Vehicle, 'id'> = {
      tenantId: MOCK_TENANT_ID,
      type,
      status,
      currentTrip: vehicleToEdit?.currentTrip || null,
      driver: {
        id: driverId || `driver_${Date.now()}`, // Create a mock ID if none exists
        name: driverName,
      },
    };

    setDocumentNonBlocking(vehicleDocRef, vehicleData, { merge: isEditing });

    toast({
      title: isEditing ? "Vehicle Updated" : "Vehicle Added",
      description: `Vehicle ${vehicleId} has been successfully saved.`,
    });
    
    setIsSubmitting(false);
    onFormClose(); // Close form/reset selection after submit
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6" />
            {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
        </CardTitle>
        <CardDescription>
            {isEditing ? `Editing vehicle: ${vehicleToEdit.id}` : 'Add a new vehicle to the fleet.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="vehicleId">Vehicle ID</Label>
                <Input 
                    id="vehicleId" 
                    placeholder="e.g., HT-001"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    disabled={isSubmitting || isEditing}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as Vehicle['type'])} disabled={isSubmitting}>
                    <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {vehicleTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as Vehicle['status'])} disabled={isSubmitting}>
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {vehicleStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
             <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <Input 
                    id="driverName" 
                    placeholder="e.g., Jane Doe"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isEditing ? 'Save Changes' : 'Add Vehicle'}
            </Button>
            {isEditing && (
                <Button variant="outline" className="w-full" onClick={onFormClose} disabled={isSubmitting}>
                    Cancel Edit
                </Button>
            )}
        </CardFooter>
      </form>
    </Card>
  );
}
