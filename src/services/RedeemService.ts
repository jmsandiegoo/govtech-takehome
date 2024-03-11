import { RedeemGiftResDTO } from "../dto/response/RedeemGiftResDTO";
import { ServiceError } from "../errors/ServiceError";
import { Redeem } from "../models/Redeem";
import { Team } from "../models/Team";
import { IRedeemRepository } from "../repositories/IRedeemRepository";
import { ITeamRepository } from "../repositories/ITeamRepository";
import { IRedeemService } from "./IRedeemService";

export class RedeemService implements IRedeemService {
    private teamRepository: ITeamRepository;
    private redeemRepository: IRedeemRepository;

    constructor(teamRepository: ITeamRepository, redeemRepository: IRedeemRepository) {
        this.teamRepository = teamRepository;
        this.redeemRepository = redeemRepository;
    }

    public async redeemGift(teamName: string, redeemedAt: Date | null): Promise<RedeemGiftResDTO> {
        const team: Team | null = await this.teamRepository.getTeamByName(teamName);

        if (!team) { // team provided does not exist
            throw new ServiceError("Team does not exist.");
        }

        const redeem: Redeem | null = await this.redeemRepository.getRedeemByTeamName(teamName);

        if (redeem) {
            throw new ServiceError("Team has already redeemed previously :(");
        }

        const nredeem: Redeem | null = await this.redeemRepository.createRedeem(teamName, redeemedAt);

        if (!nredeem) {
            throw new ServiceError("Redeem gift failed. Try again.");
        }

        return {
            redeemId: nredeem.redeemId,
            teamName: nredeem.teamName,
            redeemedAt: nredeem.redeemedAt,
        }
    }

}