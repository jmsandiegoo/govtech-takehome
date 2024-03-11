import { INITIALIZE_MESSAGE } from "./constants/messages";
import { IParser } from "./parser/IParser";
import { IUI } from "./ui/IUI";
import { ICommand } from "./commands/ICommand";
import { CommandResDTO } from "./dto/response/CommandResDTO";

export class MainApp {
    private ui: IUI;
    private parser: IParser;

    constructor(ui:IUI, parser: IParser) {
        this.ui = ui;
        this.parser = parser;
    }

    public start(): void {
        this.ui.outputToUser(INITIALIZE_MESSAGE);
        this.ui.greetUser();
    }

    public async runUntilExit(): Promise<void> {
        let isActive: boolean = true;
        while (isActive) {
            try {
                const rawUserCommand = await this.ui.getRawUserCommand();
                const command: ICommand = this.parser.parseRawUserCommand(rawUserCommand);
                const result: CommandResDTO = await command.execute();
                this.ui.outputResultToUser(result.resultMessage);
            } catch (error) {
                console.error(error);
            }
        }
    };
}