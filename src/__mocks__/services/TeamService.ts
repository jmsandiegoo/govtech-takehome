import { VerifyTeamRedemptionResDTO } from "../../dto/response/VerifyTeamRedemptionResDTO";
import { ITeamService } from "../../services/ITeamService";

export default class TeamService implements ITeamService {
    public verifyTeamRedemption = jest.fn<Promise<VerifyTeamRedemptionResDTO>, [string]>();
}