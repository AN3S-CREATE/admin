export type Vehicle = {
    id: string;
    tenantId: string;
    type: 'Haul Truck' | 'Light Vehicle' | 'Excavator' | 'Dozer';
    status: 'On Route' | 'Idle' | 'Maintenance' | 'Offline';
    currentTrip: string | null;
    driver: {
        id: string;
        name: string;
    }
};
