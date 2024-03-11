import { ICommand } from "../commands/ICommand";
import { IParser } from "./IParser";
import { LookupCommand } from "../commands/LookupCommand";
import { IStaffService } from "../services/IStaffService";

export class Parser implements IParser {
    private static readonly BASIC_COMMAND_FORMAT: RegExp = /^(?<commandWord>\S+)(?<args>.*)/;
    private static readonly LOOKUP_ARGS_FORMAT: RegExp = /^(?<staffPassId>.+)/;

    private staffService: IStaffService;

    constructor(staffService: IStaffService) {
        this.staffService = staffService;
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
            case LookupCommand.COMMAND_WORD:
                command = this.parseLookupCommand(args);
                break;
            default:
                throw new Error("command not exist");
        }

        return command;
    }

    private parseLookupCommand(args: string): ICommand{

        const matcher: RegExpExecArray | null = Parser.LOOKUP_ARGS_FORMAT.exec(args.trim());

        if (!matcher) {
            console.log("parser error");
        }
        
        const staffPassId = matcher?.groups?.staffPassId || '';

        if (staffPassId === '') {
            console.log("staff id required error");
        }

        return new LookupCommand(staffPassId, this.staffService);
    }
}