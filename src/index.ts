#!/usr/bin/env node

import { UI } from "./ui/UI";

class MainApp {
    private UI: UI;

    constructor() {
        this.UI = new UI(process.stdin, process.stdout); 
    }

    public start(): void {
        console.log("initializing stuff");
    }

    public async runUntilExit(): Promise<void> {
        let isActive: boolean = true;
        while (isActive) {
            try {
                const rawUserCommand = await this.UI.getRawUserCommand();
                this.UI.outputTouser(rawUserCommand);
            } catch (error) {
                
            }
        }
    };
}

const mainApp = new MainApp();
mainApp.start();
mainApp.runUntilExit();