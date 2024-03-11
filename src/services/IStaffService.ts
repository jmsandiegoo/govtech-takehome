import { StaffLookUpResDTO } from "../dto/response/StaffLookupResDTO";

export interface IStaffService {
    /**
     * @param {string} staffPassId the team name to verify redemption 
     * @returns {StaffLookUpResDTO}
     * @throws {ServiceError} throws an error if team does not exists or any unexpected errors.
     */
    lookUpStaffByPassId(staffPassId: string): Promise<StaffLookUpResDTO | null>
}