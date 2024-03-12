import { Staff } from "../../models/Staff";
import { IStaffRepository } from "../../repositories/IStaffRepository";

export default class StaffRepository implements IStaffRepository {
    public getStaffByPassId = jest.fn<Promise<Staff | null>, [string]>();
}