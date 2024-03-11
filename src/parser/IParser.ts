import { ICommand } from "../commands/ICommand";

export interface IParser {
    parseRawUserCommand(rawUserInput: string): ICommand;
}