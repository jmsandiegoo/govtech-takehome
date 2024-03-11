import { CommandResDTO } from "../dto/response/CommandResDTO";


export interface ICommand {
    /**
     * Returns CommandResult of the executing command.
     * If there is an unexpected error during execution,
     * CommandExecutionException is thrown.
     *
     * @return CommandResult the success result of the execution.
     * @throws CommandExecutionException If an unexpected error occured.
     */
    execute(): Promise<CommandResDTO>;
}