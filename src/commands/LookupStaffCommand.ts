import { IStaffService } from "../services/IStaffService";
import { ICommand } from "./ICommand";
import { CommandResDTO } from "../dto/response/CommandResDTO";
import { ServiceError } from "../errors/ServiceError";
import { CommandExecutionError } from "../errors/CommandExecutionError";
import { gen_fail_cmd_message, gen_success_cmd_messsage } from "../utils/helper";

export class LookupStaffCommand implements ICommand {
    public static readonly COMMAND_WORD = "lookup-staff";

    private staffPassId: string;
    private staffService: IStaffService;

    constructor(staffPassId: string, staffService: IStaffService) {
        this.staffPassId = staffPassId;
        this.staffService = staffService;
    }

    /**
     * @Override
     */
    public async execute(): Promise<CommandResDTO> {
        try {
            const res = await this.staffService.lookUpStaffByPassId(this.staffPassId);

            return {resultMessage: gen_success_cmd_messsage(LookupStaffCommand.COMMAND_WORD, "Staff Record found:\n" + 
                `StaffPassId: ${res.staffPassId}\n` +
                `TeamName: ${res.teamName}\n` +
                `This staff is ${res.isEligibleToRedeem ? 'eligible' : 'not eligible'} to redeem team's gift.`)}
        } catch (error) {
            if (error instanceof ServiceError) {
                throw new CommandExecutionError(gen_fail_cmd_message(LookupStaffCommand.COMMAND_WORD, error.message));
            } else {
                throw error;
            }
        }
    }
}