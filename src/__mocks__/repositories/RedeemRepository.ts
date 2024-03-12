import { Redeem } from "../../models/Redeem";
import { IRedeemRepository } from "../../repositories/IRedeemRepository";


export default class RedeemRepository implements IRedeemRepository {
    public getRedeemByTeamName = jest.fn<Promise<Redeem | null>, [string]>();
    public createRedeem = jest.fn<Promise<Redeem | null>, [string, Date | null]>();
}