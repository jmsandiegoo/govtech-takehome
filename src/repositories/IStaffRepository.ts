import { Staff } from "../models/Staff";

export interface IStaffRepository {
    getStaffByPassId(staffPassId: string): Promise<Staff | null>;
}