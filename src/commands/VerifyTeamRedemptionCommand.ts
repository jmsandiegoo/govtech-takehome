import { CommandResDTO } from "../dto/response/CommandResDTO";
import { ServiceError } from "../errors/ServiceError";
import { ITeamService } from "../services/ITeamService";
import { ICommand } from "./ICommand";
import { gen_fail_cmd_message, gen_success_cmd_messsage } from "../utils/helper";
import { CommandExecutionError } from "../errors/CommandExecutionError";

export class VerifyTeamRedemptionCommand implements ICommand {
    public static readonly COMMAND_WORD = "verify-team-redemption";

    private teamName: string;
    private teamService: ITeamService;

    constructor(teamName: string, teamService: ITeamService) {
        this.teamName = teamName;
        this.teamService = teamService;
    }

    /**
     * @Override
     */
    public async execute(): Promise<CommandResDTO> {
        try {
            const res = await this.teamService.verifyTeamRedemption(this.teamName);
            return {resultMessage: gen_success_cmd_messsage(VerifyTeamRedemptionCommand.COMMAND_WORD,
                `${res.teamName} has ${res.isEligibleToRedeem ? 'not' : 'already'} redeemed`)};
        } catch (error) {
            if (error instanceof ServiceError) {
                throw new CommandExecutionError(gen_fail_cmd_message(VerifyTeamRedemptionCommand.COMMAND_WORD, error.message));
            } else {
                throw error;
            }
        }
    }
}