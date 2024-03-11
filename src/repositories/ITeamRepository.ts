import { Team } from "../models/Team";

export interface ITeamRepository {
    getTeamByName(teamName: string): Promise<Team | null>;
}