#!/usr/bin/env node
import 'dotenv/config';
import { MainApp } from "./MainApp";
import { Database } from './database/Database';
import { RedeemRepository } from './repositories/RedeemRepository';
import { UI } from './ui/UI';
import { Parser } from './parser/Parser';
import { StaffService } from './services/StaffService';
import { StaffRepository } from './repositories/StaffRepository';

// instantiate di dependencies
const database: Database = new Database();
const staffRepository: StaffRepository = new StaffRepository(database);
const redeemRepository: RedeemRepository = new RedeemRepository(database);
const staffService: StaffService = new StaffService(staffRepository, redeemRepository);
const parser: Parser = new Parser(staffService);
const ui: UI = new UI();

const mainApp = new MainApp(ui, parser);
mainApp.start();
mainApp.runUntilExit();