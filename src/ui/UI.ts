import * as readline from "readline";

export class UI {
    private reader: readline.Interface;
    private outputStream: NodeJS.WriteStream;

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

    public async getRawUserCommand(): Promise<string> {
        let rawInputLine: string;
        do {
            rawInputLine = await this.questionAsync("Enter command: ");
        } while (this.shouldIgnore(rawInputLine))

        return rawInputLine;
    }

    public outputTouser(...messages: string[]): void {
        for (let m of messages) {
            this.outputStream.write(m + "\n");
        }
    }
}
