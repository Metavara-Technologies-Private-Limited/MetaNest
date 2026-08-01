// export interface MockFlat {
//   id: string;
//   flatNo: string;
//   residentName: string;
//   residentType: 'Owner' | 'Tenant';
//   amount: number;
//   contact: string;
// }

// const TOTAL_FLATS = 60;

// export const MOCK_FLATS: MockFlat[] = Array.from({ length: TOTAL_FLATS }, (_, index) => {
//   const number = index + 1;
//   const residentType: 'Owner' | 'Tenant' = number % 3 === 0 ? 'Tenant' : 'Owner';
//   return {
//     id: `f${number}`,
//     flatNo: `Flat ${String(number).padStart(3, '0')}`,
//     residentName: `${residentType} ${number}`,
//     residentType,
//     amount: 2000,
//     contact: `9810000${String(number).padStart(3, '0')}`,
//   };
// });

// export type BillStatus = 'Pending' | 'Paid' | 'Overdue';
// export type BillType = 'Monthly' | 'Adhoc';

// export interface MockBill {
//   id: string;
//   flatNo: string;
//   residentName: string;
//   residentType: 'Owner' | 'Tenant';
//   type: BillType;
//   status: BillStatus;
//   description: string;
//   billNumber: string;
//   amount: number;
//   dueDate: string;
//   generatedDate: string;
// }

// export const INITIAL_BILLS: MockBill[] = [
//   {
//     id: 'b1',
//     flatNo: 'Flat 004',
//     residentName: 'Owner 4',
//     residentType: 'Owner',
//     type: 'Monthly',
//     status: 'Pending',
//     description: 'Monthly maintenance bill for July 2026',
//     billNumber: 'MB-202607-004',
//     amount: 2000,
//     dueDate: '17/7/2026',
//     generatedDate: '10/7/2026',
//   },
//   {
//     id: 'b2',
//     flatNo: 'Flat 001',
//     residentName: 'Owner 1',
//     residentType: 'Owner',
//     type: 'Monthly',
//     status: 'Paid',
//     description: 'Monthly maintenance bill for June 2026',
//     billNumber: 'MB-202606-001',
//     amount: 2000,
//     dueDate: '17/6/2026',
//     generatedDate: '10/6/2026',
//   },
//   {
//     id: 'b3',
//     flatNo: 'Flat 003',
//     residentName: 'Tenant 3',
//     residentType: 'Tenant',
//     type: 'Adhoc',
//     status: 'Overdue',
//     description: 'Water tank repair charges',
//     billNumber: 'AB-202605-003',
//     amount: 1500,
//     dueDate: '5/6/2026',
//     generatedDate: '25/5/2026',
//   },
// ];

// export type AmcStatus = 'UPCOMING' | 'OVERDUE';
// export type AmcIconKey = 'generator' | 'elevator' | 'water';

// export interface AmcService {
//   id: string;
//   iconKey: AmcIconKey;
//   title: string;
//   description: string;
//   vendor: string;
//   lastService: string;
//   nextService: string;
//   cost: number;
//   status: AmcStatus;
//   warning?: string;
// }

// export const MOCK_AMC_SERVICES: AmcService[] = [
//   {
//     id: 'a1',
//     iconKey: 'generator',
//     title: 'Generator AMC Due',
//     description: 'Annual maintenance contract for backup generator',
//     vendor: 'PowerTech Solutions',
//     lastService: '14/8/2025',
//     nextService: '14/8/2026',
//     cost: 25000,
//     status: 'UPCOMING',
//   },
//   {
//     id: 'a2',
//     iconKey: 'elevator',
//     title: 'Elevator Maintenance Overdue',
//     description: 'Quarterly maintenance for all elevators',
//     vendor: 'Lift Masters Pvt Ltd',
//     lastService: '1/4/2026',
//     nextService: '30/6/2026',
//     cost: 18000,
//     status: 'OVERDUE',
//     warning: 'Service overdue. Please schedule maintenance immediately.',
//   },
//   {
//     id: 'a3',
//     iconKey: 'water',
//     title: 'Water Tank Cleaning',
//     description: 'Bi-annual water tank cleaning and sanitization',
//     vendor: 'AquaClean Services',
//     lastService: '10/1/2026',
//     nextService: '10/7/2026',
//     cost: 8000,
//     status: 'UPCOMING',
//   },
// ];

// export interface SocietyDetails {
//   societyName: string;
//   registrationNo: string;
//   totalFlats: number;
//   totalBlocks: number;
//   yearEstablished: number;
//   address: string;
//   cityState: string;
//   pincode: string;
//   phone: string;
//   email: string;
//   bankName: string;
//   accountNo: string;
//   ifscCode: string;
//   upiId: string;
// }

// export const INITIAL_SOCIETY_DETAILS: SocietyDetails = {
//   societyName: 'Epsilon Homes',
//   registrationNo: 'MH/CHS/2015/0042',
//   totalFlats: 60,
//   totalBlocks: 3,
//   yearEstablished: 2015,
//   address: 'Plot No. 14, Sector 7, Kharghar, Navi Mumbai - 410210',
//   cityState: 'Navi Mumbai, Maharashtra',
//   pincode: '410210',
//   phone: '+91 98765 43210',
//   email: 'admin@epsilonhomes.in',
//   bankName: 'HDFC Bank',
//   accountNo: 'XXXX XXXX 4510',
//   ifscCode: 'HDFC0001234',
//   upiId: 'epsilonhomes@hdfcbank',
// };


export interface MockFlat {
  id: string;
  flatNo: string;
  residentName: string;
  residentType: 'Owner' | 'Tenant';
  amount: number;
  contact: string;
}

const TOTAL_FLATS = 60;

export const MOCK_FLATS: MockFlat[] = Array.from({ length: TOTAL_FLATS }, (_, index) => {
  const number = index + 1;
  const residentType: 'Owner' | 'Tenant' = number % 3 === 0 ? 'Tenant' : 'Owner';
  return {
    id: `f${number}`,
    flatNo: `Flat ${String(number).padStart(3, '0')}`,
    residentName: `${residentType} ${number}`,
    residentType,
    amount: 2000,
    contact: `9810000${String(number).padStart(3, '0')}`,
  };
});

export type BillStatus = 'Pending' | 'Paid' | 'Overdue';
export type BillType = 'Monthly' | 'Adhoc';

export interface MockBill {
  id: string;
  flatNo: string;
  residentName: string;
  residentType: 'Owner' | 'Tenant';
  type: BillType;
  status: BillStatus;
  description: string;
  billNumber: string;
  amount: number;
  dueDate: string;
  generatedDate: string;
}

export const INITIAL_BILLS: MockBill[] = [
  {
    id: 'b1',
    flatNo: 'Flat 004',
    residentName: 'Owner 4',
    residentType: 'Owner',
    type: 'Monthly',
    status: 'Pending',
    description: 'Monthly maintenance bill for July 2026',
    billNumber: 'MB-202607-004',
    amount: 2000,
    dueDate: '17/7/2026',
    generatedDate: '10/7/2026',
  },
  {
    id: 'b2',
    flatNo: 'Flat 001',
    residentName: 'Owner 1',
    residentType: 'Owner',
    type: 'Monthly',
    status: 'Paid',
    description: 'Monthly maintenance bill for June 2026',
    billNumber: 'MB-202606-001',
    amount: 2000,
    dueDate: '17/6/2026',
    generatedDate: '10/6/2026',
  },
  {
    id: 'b3',
    flatNo: 'Flat 003',
    residentName: 'Tenant 3',
    residentType: 'Tenant',
    type: 'Adhoc',
    status: 'Overdue',
    description: 'Water tank repair charges',
    billNumber: 'AB-202605-003',
    amount: 1500,
    dueDate: '5/6/2026',
    generatedDate: '25/5/2026',
  },
];

export type AmcStatus = 'UPCOMING' | 'OVERDUE';
export type AmcIconKey = 'generator' | 'elevator' | 'water';

export interface AmcService {
  id: string;
  iconKey: AmcIconKey;
  title: string;
  description: string;
  vendor: string;
  lastService: string;
  nextService: string;
  cost: number;
  status: AmcStatus;
  warning?: string;
}

export const MOCK_AMC_SERVICES: AmcService[] = [
  {
    id: 'a1',
    iconKey: 'generator',
    title: 'Generator AMC Due',
    description: 'Annual maintenance contract for backup generator',
    vendor: 'PowerTech Solutions',
    lastService: '14/8/2025',
    nextService: '14/8/2026',
    cost: 25000,
    status: 'UPCOMING',
  },
  {
    id: 'a2',
    iconKey: 'elevator',
    title: 'Elevator Maintenance Overdue',
    description: 'Quarterly maintenance for all elevators',
    vendor: 'Lift Masters Pvt Ltd',
    lastService: '1/4/2026',
    nextService: '30/6/2026',
    cost: 18000,
    status: 'OVERDUE',
    warning: 'Service overdue. Please schedule maintenance immediately.',
  },
  {
    id: 'a3',
    iconKey: 'water',
    title: 'Water Tank Cleaning',
    description: 'Bi-annual water tank cleaning and sanitization',
    vendor: 'AquaClean Services',
    lastService: '10/1/2026',
    nextService: '10/7/2026',
    cost: 8000,
    status: 'UPCOMING',
  },
];

export interface SocietyDetails {
  societyName: string;
  registrationNo: string;
  totalFlats: number;
  totalBlocks: number;
  yearEstablished: number;
  address: string;
  cityState: string;
  pincode: string;
  phone: string;
  email: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  upiId: string;
}

export const INITIAL_SOCIETY_DETAILS: SocietyDetails = {
  societyName: 'Epsilon Homes',
  registrationNo: 'MH/CHS/2015/0042',
  totalFlats: 60,
  totalBlocks: 3,
  yearEstablished: 2015,
  address: 'Plot No. 14, Sector 7, Kharghar, Navi Mumbai - 410210',
  cityState: 'Navi Mumbai, Maharashtra',
  pincode: '410210',
  phone: '+91 98765 43210',
  email: 'admin@epsilonhomes.in',
  bankName: 'HDFC Bank',
  accountNo: 'XXXX XXXX 4510',
  ifscCode: 'HDFC0001234',
  upiId: 'epsilonhomes@hdfcbank',
};

// ---------------------------------------------------------------------------
// Block / Floor / Flat Management
// (kept internally consistent: 3 wings -> 64 flats total -> 54 occupied / 10 vacant,
// matching the totals already used in Society Details' "Total Flats" style fields)
// ---------------------------------------------------------------------------

const FLOOR_LABELS = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
const FLOOR_CODES = ['GF', '1F', '2F', '3F', '4F', '5F'];

export interface Wing {
  id: string;
  code: string;
  name: string;
  description: string;
  floors: number;
  totalFlats: number;
  occupiedFlats: number;
}

export const INITIAL_WINGS: Wing[] = [
  {
    id: 'w1',
    code: 'A',
    name: 'Wing A',
    description: 'East-facing, premium units',
    floors: 6,
    totalFlats: 24,
    occupiedFlats: 21,
  },
  {
    id: 'w2',
    code: 'B',
    name: 'Wing B',
    description: 'West-facing, garden view',
    floors: 6,
    totalFlats: 24,
    occupiedFlats: 20,
  },
  {
    id: 'w3',
    code: 'C',
    name: 'Wing C',
    description: 'North-facing, compact units',
    floors: 4,
    totalFlats: 16,
    occupiedFlats: 13,
  },
];

export interface FloorRecord {
  id: string;
  wingCode: string;
  wingLabel: string;
  level: number;
  floorLabel: string;
  flatsCount: number;
}

export const MOCK_FLOORS: FloorRecord[] = INITIAL_WINGS.flatMap((wing) => {
  const flatsPerFloor = wing.totalFlats / wing.floors;
  return Array.from({ length: wing.floors }, (_, level) => ({
    id: `${wing.code}-floor-${level}`,
    wingCode: wing.code,
    wingLabel: wing.name,
    level,
    floorLabel: FLOOR_LABELS[level] ?? `${level}th Floor`,
    flatsCount: flatsPerFloor,
  }));
});

export type FlatType = '1BHK' | '2BHK' | '3BHK';
export type FlatStatus = 'occupied' | 'vacant';

export interface FlatUnit {
  id: string;
  flatNo: string;
  wingCode: string;
  wingLabel: string;
  floorCode: string;
  type: FlatType;
  area: number;
  status: FlatStatus;
  owner: string;
  parking?: string;
  maintenance: number;
}

const UNIT_TYPE_PATTERN: FlatType[] = ['2BHK', '3BHK', '2BHK', '1BHK'];
const AREA_BY_TYPE: Record<FlatType, number> = { '1BHK': 650, '2BHK': 1050, '3BHK': 1450 };
const MAINTENANCE_BY_TYPE: Record<FlatType, number> = { '1BHK': 2500, '2BHK': 3500, '3BHK': 4500 };

// Specific flats forced vacant so wing totals above (occupiedFlats) stay accurate
const VACANT_FLAT_NOS = new Set([
  'A-003', 'A-205', 'A-402',
  'B-003', 'B-104', 'B-301', 'B-403',
  'C-002', 'C-201', 'C-303',
]);

const OWNER_OVERRIDES: Record<string, string> = {
  'A-001': 'Rajesh Kumar',
  'A-002': 'Sunita Verma',
  'A-003': 'Deepak Malhotra',
  'A-004': 'Priya Nair',
  'A-101': 'Vikram Singh',
  'A-102': 'Meera Patel',
  'A-103': 'Suresh Reddy',
  'A-104': 'Anita Desai',
  'B-001': 'Ramesh Gupta',
  'B-002': 'Lakshmi Iyer',
  'B-003': 'Rajiv Kapoor',
};

const OWNER_POOL = [
  'Arjun Rao', 'Kavita Joshi', 'Manoj Tiwari', 'Neha Bhatt', 'Sanjay Menon',
  'Divya Pillai', 'Rohit Saxena', 'Pooja Chawla', 'Karan Malhotra', 'Shreya Kulkarni',
  'Ajay Bhandari', 'Nisha Rane', 'Vivek Agarwal', 'Swati Deshmukh', 'Gaurav Khanna',
  'Ritu Sinha', 'Amit Bose', 'Kiran Shetty', 'Naveen Reddy', 'Pallavi Nayak',
  'Harish Chandra', 'Sneha Kapoor', 'Deepak Bhagat', 'Anjali Dutta', 'Mohit Arora',
  'Preeti Bajaj', 'Sameer Vora', 'Isha Thakur', 'Nikhil Ghosh', 'Radhika Iyengar',
  'Tarun Mehra', 'Vandana Kher', 'Yogesh Pandit', 'Alka Chopra', 'Rahul Dixit',
];

let ownerPoolIndex = 0;
function ownerFor(flatNo: string): string {
  const override = OWNER_OVERRIDES[flatNo];
  if (override) return override;
  const name = OWNER_POOL[ownerPoolIndex % OWNER_POOL.length];
  ownerPoolIndex += 1;
  return name;
}

export const MOCK_FLAT_UNITS: FlatUnit[] = INITIAL_WINGS.flatMap((wing) => {
  const flatsPerFloor = wing.totalFlats / wing.floors;
  return Array.from({ length: wing.floors }, (_, level) =>
    Array.from({ length: flatsPerFloor }, (_, unitIndex) => {
      const type = UNIT_TYPE_PATTERN[unitIndex % UNIT_TYPE_PATTERN.length];
      const flatNo = `${wing.code}-${String(level * 100 + unitIndex + 1).padStart(3, '0')}`;
      const status: FlatStatus = VACANT_FLAT_NOS.has(flatNo) ? 'vacant' : 'occupied';
      const parking =
        level === 0 && unitIndex < 3
          ? `${wing.code}-P${String(unitIndex + 1).padStart(2, '0')}`
          : undefined;

      return {
        id: flatNo,
        flatNo,
        wingCode: wing.code,
        wingLabel: wing.name,
        floorCode: FLOOR_CODES[level] ?? `${level}F`,
        type,
        area: AREA_BY_TYPE[type],
        status,
        owner: ownerFor(flatNo),
        parking,
        maintenance: MAINTENANCE_BY_TYPE[type],
      };
    }),
  ).flat();
});