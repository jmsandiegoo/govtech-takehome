
export interface IUI {
    greetUser(): void;
    getRawUserCommand(): Promise<string>;
    outputResultToUser(resultMessage: string): void 
    outputToUser(...messages: string[]): void;
}