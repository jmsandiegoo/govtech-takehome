import { Service } from "typedi";
import { Redeem } from "../models/Redeem";
import { IRedeemRepository } from "./IRedeemRepository";
import { Database } from "../database/Database";

@Service()
export class RedeemRepository implements IRedeemRepository {
    private dbService: Database;

    constructor(dbService: Database) {
        this.dbService = dbService;
    }

    public async getRedeemByTeamName(teamName: string): Promise<Redeem | undefined> {
        const redeem = await this.dbService
            .getInstance()
            .selectFrom("redeems")
            .selectAll()
            .where("team_name", "=", teamName)
            .executeTakeFirst();

        return redeem
            ? {redeemId: redeem.redeem_id, 
                teamName: redeem.team_name, 
                redeemedAt: redeem.redeemed_at}
            : undefined;
    }
}