import { Redeem } from "../models/Redeem";

export interface IRedeemRepository {
    getRedeemByTeamName(teamName: string): Promise<Redeem | undefined>;
}