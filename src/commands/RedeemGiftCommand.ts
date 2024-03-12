import { CommandResDTO } from "../dto/response/CommandResDTO";
import { ServiceError } from "../errors/ServiceError";;
import { ICommand } from "./ICommand";
import { gen_fail_cmd_message, gen_success_cmd_messsage } from "../utils/helper";
import { CommandExecutionError } from "../errors/CommandExecutionError";
import { IRedeemService } from "../services/IRedeemService";

export class RedeemGiftCommand implements ICommand {
    public static readonly COMMAND_WORD = "redeem-gift";

    private teamName: string;
    private redeemService: IRedeemService;

    constructor(teamName: string, redeemService: IRedeemService) {
        this.teamName = teamName;
        this.redeemService = redeemService;
    }

    /**
     * @Override
     */
    public async execute(): Promise<CommandResDTO> {
        try {
            const res = await this.redeemService.redeemGift(this.teamName, null);
            return {resultMessage: gen_success_cmd_messsage(RedeemGiftCommand.COMMAND_WORD,
                `${res.teamName} has successfully redeemed the gift. \n` + 
                `redeemId: ${res.redeemId} \n` +
                `redeemedAt: ${res.redeemedAt}`)};
        } catch (error) {
            if (error instanceof ServiceError) {
                throw new CommandExecutionError(gen_fail_cmd_message(RedeemGiftCommand.COMMAND_WORD, error.message));
            } else {
                throw error;
            }
        }
    }
}