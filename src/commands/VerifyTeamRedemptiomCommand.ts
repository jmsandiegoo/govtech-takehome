import { CommandResDTO } from "../dto/response/CommandResDTO";
import { ServiceError } from "../errors/ServiceError";
import { ITeamService } from "../services/ITeamService";
import { ICommand } from "./ICommand";
import { gen_fail_cmd_message, gen_success_cmd_messsage } from "../utils/helper";
import { CommandExecutionError } from "../errors/CommandExecutionError";

export class VerifyTeamRedemptiomCommand implements ICommand {
    public static readonly COMMAND_WORD = "verify-team-redemption";
    public static GEN_SUCCESS_MESSAGE = 
        (teamName: string, isEligibleToRedeem: boolean) => 
            `${VerifyTeamRedemptiomCommand.COMMAND_WORD} done: \n` +
            `${teamName} has ${isEligibleToRedeem ? 'not' : 'already'} redeemed`;
    public static GEN_FAIL_MESSAGE = (errorMessage: string) => 
            `${VerifyTeamRedemptiomCommand.COMMAND_WORD} failed: \n` +
            errorMessage;

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
            return {resultMessage: gen_success_cmd_messsage(VerifyTeamRedemptiomCommand.COMMAND_WORD,
                `${res.teamName} has ${res.isEligibleToRedeem ? 'not' : 'already'} redeemed`)};
        } catch (error) {
            if (error instanceof ServiceError) {
                throw new CommandExecutionError(gen_fail_cmd_message(VerifyTeamRedemptiomCommand.COMMAND_WORD, error.message));
            } else {
                throw error;
            }
        }
    }
}