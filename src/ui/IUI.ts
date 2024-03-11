
export interface IUI {
    greetUser(): void;
    getRawUserCommand(): Promise<string>;
    outputResultToUser(resultMessage: string): void;
    outputErrorToUser(errorMessage: string): void;
    outputToUser(...messages: string[]): void;
}