import { CommandResDTO } from "../dto/response/CommandResDTO";


export interface ICommand {
    /**
     * Returns CommandResult of the executing command.
     * If there is an unexpected error during execution,
     * CommandExecutionError is thrown.
     *
     * @return {CommandResDTO}
     * @throws {CommandExecutionError} If an unexpected error occured.
     */
    execute(): Promise<CommandResDTO>;
}