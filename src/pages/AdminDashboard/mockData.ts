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
