#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UI_1 = require("./ui/UI");
class MainApp {
    constructor() {
        this.UI = new UI_1.UI(process.stdin, process.stdout);
    }
    start() {
        console.log("initializing stuff");
    }
    runUntilExit() {
        return __awaiter(this, void 0, void 0, function* () {
            let isActive = true;
            while (isActive) {
                try {
                    const rawUserCommand = yield this.UI.getRawUserCommand();
                    this.UI.outputTouser(rawUserCommand);
                }
                catch (error) {
                }
            }
        });
    }
    ;
}
const mainApp = new MainApp();
mainApp.start();
mainApp.runUntilExit();
