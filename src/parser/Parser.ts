import { ICommand } from "../commands/ICommand";
import { IParser } from "./IParser";
import { LookupStaffCommand } from "../commands/LookupStaffCommand";
import { IStaffService } from "../services/IStaffService";
import { ITeamService } from "../services/ITeamService";
import { InvalidCommandError } from "../errors/InvalidCommandError";
import { VerifyTeamRedemptiomCommand } from "../commands/VerifyTeamRedemptiomCommand";

export class Parser implements IParser {
    private static readonly BASIC_COMMAND_FORMAT: RegExp = /^(?<commandWord>\S+)(?<args>.*)/;
    private static readonly LOOKUP_STAFF_ARGS_FORMAT: RegExp = /^(?<staffPassId>.+)/;
    private static readonly VERIFY_TEAM_REDEMPTION_ARGS_FORMAT: RegExp = /^(?<teamName>.+)/;

    private staffService: IStaffService;
    private teamService: ITeamService;

    constructor(staffService: IStaffService, teamService: ITeamService) {
        this.staffService = staffService;
        this.teamService = teamService;
    }

    /**
     * @Override
     */
    public parseRawUserCommand(rawUserInput: string): ICommand{
        const matcher: RegExpExecArray | null = Parser.BASIC_COMMAND_FORMAT.exec(rawUserInput.trim());
        if (!matcher) {
            console.log("parser error");
        }

        const commandWord: string = matcher?.groups?.commandWord || '';
        const args: string = matcher?.groups?.args || '';

        let command: ICommand;
        switch (commandWord) {
            case LookupStaffCommand.COMMAND_WORD:
                command = this.parseLookupStaffCommand(args);
                break;
            case VerifyTeamRedemptiomCommand.COMMAND_WORD:
                command = this.parseVerifyTeamRedemptionCommand(args);
            default:
                throw new InvalidCommandError("Command not exist.");
        }

        return command;
    }

    private parseLookupStaffCommand(args: string): ICommand{

        const matcher: RegExpExecArray | null = Parser.LOOKUP_STAFF_ARGS_FORMAT.exec(args.trim());

        if (!matcher) {
            console.log("parser error.");
        }
        
        const staffPassId = matcher?.groups?.staffPassId || '';

        if (staffPassId === '') {
            throw new InvalidCommandError("<staffPassId> is required.")
        }

        return new LookupStaffCommand(staffPassId, this.staffService);
    }

    private parseVerifyTeamRedemptionCommand(args: string): ICommand{

        const matcher: RegExpExecArray | null = Parser.VERIFY_TEAM_REDEMPTION_ARGS_FORMAT.exec(args.trim());

        if (!matcher) {
            throw new InvalidCommandError("Invalid command.");
        }
        
        const teamName = matcher?.groups?.teamName || '';

        if (teamName === '') {
            throw new InvalidCommandError("<teamName> is required.");
        }

        return new VerifyTeamRedemptiomCommand(teamName, this.teamService);
    }
}