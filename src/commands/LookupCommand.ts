import { IStaffService } from "../services/IStaffService";
import { ICommand } from "./ICommand";
import { CommandResDTO } from "../dto/response/CommandResDTO";

export class LookupCommand implements ICommand {
    public static readonly COMMAND_WORD = "lookup";

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
        const res = await this.staffService.lookUpStaffByPassId(this.staffPassId);

        return res 
            ? {resultMessage: "Look up success! Staff Record found:\n" + 
            `StaffPassId: ${res.staffPassId}\n` +
            `TeamName: ${res.teamName}\n` +
            `This staff is ${res.isEligibleToRedeem ? 'eligible' : 'not eligible'} to redeem team's gift.`}
            : {resultMessage: `Staff not found.`}
    }
}