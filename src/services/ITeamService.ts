import { VerifyTeamRedemptionResDTO } from "../dto/response/VerifyTeamRedemptionResDTO";

export interface ITeamService {
    /**
     * @param {string} teamName the team name to verify redemption 
     * @returns {VerifyTeamRedemptionResDTO}
     * @throws {ServiceError} throws an error if team does not exists or any unexpected errors.
     */
    verifyTeamRedemption(teamName: string): Promise<VerifyTeamRedemptionResDTO>
}