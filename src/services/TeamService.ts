import { ITeamRepository } from "../repositories/ITeamRepository";
import { IRedeemRepository } from "../repositories/IRedeemRepository";
import { Redeem } from "../models/Redeem";
import { ITeamService } from "./ITeamService";
import { Team } from "../models/Team";
import { VerifyTeamRedemptionResDTO } from "../dto/response/VerifyTeamRedemptionResDTO";
import { ServiceError } from "../errors/ServiceError";


export class TeamService implements ITeamService {
    private teamRepository: ITeamRepository;
    private redeemRepository: IRedeemRepository;

    constructor(teamRepository: ITeamRepository, redeemRepository: IRedeemRepository) {
        this.teamRepository = teamRepository;
        this.redeemRepository = redeemRepository;
    }
    
    /**
     * @Overrides
     */
    public async verifyTeamRedemption(teamName: string): Promise<VerifyTeamRedemptionResDTO> {
        const team: Team | null = await this.teamRepository.getTeamByName(teamName);

        if (!team) { // team provided does not exist
            throw new ServiceError("Team name does not exist.");
        }
    
        const redeem: Redeem | null = await this.redeemRepository.getRedeemByTeamName(team.teamName);
    
        return {
            isEligibleToRedeem: redeem ? false : true,
            teamName: team.teamName,
        }
    }
}