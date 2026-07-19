export interface Amenity {
  id: string;
  name: string;
  description: string;
  hours: string;
  available: boolean;
  bookingRequired?: boolean;
}

export const MOCK_AMENITIES: Amenity[] = [
  {
    id: 'am1',
    name: 'Swimming Pool',
    description: 'Olympic-size swimming pool with separate lanes for adults and children',
    hours: '6:00 AM - 9:00 PM',
    available: true,
  },
  {
    id: 'am2',
    name: 'Gymnasium',
    description: 'Fully equipped gym with cardio and strength training equipment',
    hours: '5:00 AM - 11:00 PM',
    available: true,
  },
  {
    id: 'am3',
    name: 'Community Hall',
    description: 'Spacious hall for events and gatherings (capacity: 100 people)',
    hours: '9:00 AM - 10:00 PM',
    available: true,
    bookingRequired: true,
  },
];

export interface ParkingSlot {
  id: string;
  code: string;
  type: 'Two Wheeler' | 'Four Wheeler';
}

export interface AssignedParkingSlot extends ParkingSlot {
  plate: string;
  vehicleType: string;
}

export const MOCK_ASSIGNED_SLOTS: AssignedParkingSlot[] = [
  { id: 'p2w-02', code: '2W-02', type: 'Two Wheeler', plate: 'KA01AB1002', vehicleType: 'Scooter' },
  { id: 'p4w-02', code: '4W-02', type: 'Four Wheeler', plate: 'KA01CD2002', vehicleType: 'Car' },
];

const AVAILABLE_SLOT_COUNT = 25;
const AVAILABLE_SLOT_START = 26;

export const MOCK_AVAILABLE_SLOTS: ParkingSlot[] = Array.from(
  { length: AVAILABLE_SLOT_COUNT },
  (_, index) => {
    const number = AVAILABLE_SLOT_START + index;
    return { id: `p2w-${number}`, code: `2W-${number}`, type: 'Two Wheeler' };
  },
);
