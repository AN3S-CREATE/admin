export type Vehicle = {
    id: string;
    type: 'Haul Truck' | 'Light Vehicle' | 'Excavator' | 'Dozer';
    status: 'On Route' | 'Idle' | 'Maintenance' | 'Offline';
    currentTrip: string | null;
    driver: {
        id: string;
        name: string;
    }
};

export const fleetData: Vehicle[] = [
    {
        id: 'HT-001',
        type: 'Haul Truck',
        status: 'On Route',
        currentTrip: 'TRIP-101: Pit to Crusher',
        driver: { id: 'drv_1', name: 'John Smith' },
    },
    {
        id: 'HT-002',
        type: 'Haul Truck',
        status: 'Idle',
        currentTrip: null,
        driver: { id: 'drv_2', name: 'Maria Garcia' },
    },
    {
        id: 'EX-001',
        type: 'Excavator',
        status: 'On Route',
        currentTrip: 'ASSIGN-A: Bench 5',
        driver: { id: 'drv_3', name: 'Chen Wei' },
    },
    {
        id: 'LV-003',
        type: 'Light Vehicle',
        status: 'On Route',
        currentTrip: 'Site Inspection',
        driver: { id: 'drv_4', name: 'Fatima Al-Sayed' },
    },
    {
        id: 'HT-003',
        type: 'Haul Truck',
        status: 'Maintenance',
        currentTrip: null,
        driver: { id: 'drv_5', name: 'David Miller' },
    },
    {
        id: 'DZ-001',
        type: 'Dozer',
        status: 'Idle',
        currentTrip: null,
        driver: { id: 'drv_6', name: 'Emily Brown' },
    },
    {
        id: 'HT-004',
        type: 'Haul Truck',
        status: 'Offline',
        currentTrip: null,
        driver: { id: 'drv_7', name: 'Carlos Gomez' },
    }
];
