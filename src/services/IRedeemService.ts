import { RedeemGiftResDTO } from "../dto/response/RedeemGiftResDTO";

export interface IRedeemService {
    /**
     * @param {string} teamName the team name to verify redemption 
     * @param {Date | null} redeemedAt 
     * @returns {VerifyTeamRedemptionResDTO}
     * @throws {ServiceError} throws an error if team does not exists or any unexpected errors.
     */
    redeemGift(teamName: string, redeemedAt: Date | null): Promise<RedeemGiftResDTO>;
}