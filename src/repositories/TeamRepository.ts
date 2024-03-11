
import { Service } from "typedi";
import { Database } from "../database/Database";
import { ITeamRepository } from "./ITeamRepository";
import { Team } from "../models/Team";

@Service()
export class TeamRepository implements ITeamRepository {
    private dbService: Database;

    constructor(dbService: Database) {
        this.dbService = dbService;
    }

    /**
     * @Override
     */
    public async getTeamByName(teamName: string): Promise<Team | undefined> {
        const team = await this.dbService
            .getInstance()
            .selectFrom("teams")
            .selectAll()
            .where("team_name", "=", teamName)
            .executeTakeFirst();

        return team 
            ? {teamName: team.team_name, createdAt: team.created_at} 
            : undefined;
    }
}