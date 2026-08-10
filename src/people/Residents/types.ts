export interface Resident {
  id: number;
  name: string;
  type: "Owner" | "Tenant";
  flat: string;
  phone: string;
  moveIn: string;
  family: number;
  status: "Active" | "Inactive";
}