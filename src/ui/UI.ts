import * as readline from "readline";
import os from 'os';
import { IUI } from "./IUI";
import { LOGO, WELCOME_MESSAGE } from "../utils/constants/messages";

export class UI implements IUI {
    private reader: readline.Interface;
    private outputStream: NodeJS.WriteStream;
    private static readonly DIVIDER: string = "____________________________________________________________\n";
    private static readonly LINE_SEPARATOR: string = os.EOL;

    constructor(inputStream = process.stdin, outputStream = process.stdout) {
        this.reader = readline.createInterface({
            input: inputStream,
            output: outputStream
        });
        this.outputStream = outputStream;
    }

    private shouldIgnore(rawInputLine: string): boolean {
        return rawInputLine.trim() === "";
    }

    private questionAsync(questionText: string): Promise<string> {
        return new Promise((resolve) => {
            this.reader.question(questionText, resolve);
        });
    }

    /**
     * @Override
     */
    public greetUser(): void {
        this.outputToUser(
            LOGO,
            UI.LINE_SEPARATOR,
            WELCOME_MESSAGE,
            UI.LINE_SEPARATOR,
            UI.DIVIDER,
        );
    }

    /**
     * @Override
     */
    public async getRawUserCommand(): Promise<string> {
        let rawInputLine: string;
        do {
            rawInputLine = await this.questionAsync("Enter command: ");
        } while (this.shouldIgnore(rawInputLine))

        return rawInputLine;
    }

    /**
     * @Override
     */
    public outputResultToUser(resultMessage: string): void {
        this.outputToUser(
            UI.DIVIDER,
            UI.LINE_SEPARATOR,
            resultMessage,
            UI.LINE_SEPARATOR,
            UI.DIVIDER,
        );
    }

    /**
     * @Override
     */
    public outputErrorToUser(errorMessage: string): void {
        this.outputToUser(
            UI.DIVIDER,
            UI.LINE_SEPARATOR,
            `Oops we have a hiccup:`,
            UI.LINE_SEPARATOR,
            errorMessage,
            UI.LINE_SEPARATOR,
            UI.DIVIDER,
        );
    }

    /**
     * @Override
     */
    public outputToUser(...messages: string[]): void {
        for (let m of messages) {
            this.outputStream.write(m);
        }
    }
}
