import { Team } from "../../models/Team";
import { ITeamRepository } from "../../repositories/ITeamRepository";

export default class TeamRepository implements ITeamRepository {
    public getTeamByName = jest.fn<Promise<Team | null>, [string]>();
}