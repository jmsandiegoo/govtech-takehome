import { StaffLookUpResDTO } from "../dto/response/StaffLookupResDTO";

export interface IStaffService {
    lookUpStaffByPassId(staffPassId: string): Promise<StaffLookUpResDTO | null>
}