import { v4 as uuidv4 } from 'uuid';
import { Redeem } from "../models/Redeem";
import { IRedeemRepository } from "./IRedeemRepository";
import { Database } from "../database/Database";

export class RedeemRepository implements IRedeemRepository {
    private dbService: Database;

    constructor(dbService: Database) {
        this.dbService = dbService;
    }

    public async getRedeemByTeamName(teamName: string): Promise<Redeem | null> {
        const redeem = await this.dbService
            .getInstance()
            .selectFrom("redeems")
            .selectAll()
            .where("team_name", "=", teamName.toUpperCase())
            .executeTakeFirst();

        return redeem
            ? {redeemId: redeem.redeem_id, 
                teamName: redeem.team_name, 
                redeemedAt: redeem.redeemed_at}
            : null;
    }

    public async createRedeem(teamName: string, redeemedAt: Date | null): Promise<Redeem | null> {
        const nredeem = await this.dbService
            .getInstance()
            .insertInto("redeems")
            .values({
                redeem_id: `REDEEM_${uuidv4()}`,
                team_name: teamName.toUpperCase(),
                redeemed_at: redeemedAt ?? new Date(),
            })
            .returning(["redeem_id", "team_name", "redeemed_at"])
            .executeTakeFirst();

        return nredeem 
            ? {
                redeemId: nredeem.redeem_id,
                teamName: nredeem.team_name,
                redeemedAt: nredeem.redeemed_at}
            : null;
    }
}