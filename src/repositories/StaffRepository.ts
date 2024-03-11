
import { Database } from "../database/Database";
import { Staff } from "../models/Staff";
import { IStaffRepository } from "./IStaffRepository";

export class StaffRepository implements IStaffRepository {
    private dbService: Database;

    constructor(dbService: Database) {
        this.dbService = dbService;
    }

    public async getStaffByPassId(staffPassId: string): Promise<Staff | null> {
        const staff = await this.dbService
            .getInstance()
            .selectFrom("staffs")
            .selectAll()
            .where("staff_pass_id","=", staffPassId.toUpperCase())
            .executeTakeFirst();

        return staff 
            ? {staffPassId: staff.staff_pass_id, 
                teamName: staff.team_name, 
                createdAt: staff.created_at} 
            : null;
    }
}