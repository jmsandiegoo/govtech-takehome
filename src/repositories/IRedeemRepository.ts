import { Redeem } from "../models/Redeem";

export interface IRedeemRepository {
    getRedeemByTeamName(teamName: string): Promise<Redeem | null>;
    createRedeem(teamName: string, redeemedAt: Date | null): Promise<Redeem | null>;
}