#!/usr/bin/env node
import 'dotenv/config';
import { MainApp } from "./MainApp";
import { Database } from './database/Database';
import { RedeemRepository } from './repositories/RedeemRepository';
import { UI } from './ui/UI';
import { Parser } from './parser/Parser';
import { StaffService } from './services/StaffService';
import { StaffRepository } from './repositories/StaffRepository';
import { TeamService } from './services/TeamService';
import { TeamRepository } from './repositories/TeamRepository';
import { RedeemService } from './services/RedeemService';

// instantiate di dependencies
const database: Database = new Database();
const staffRepository: StaffRepository = new StaffRepository(database);
const redeemRepository: RedeemRepository = new RedeemRepository(database);
const teamRepository: TeamRepository = new TeamRepository(database);
const staffService: StaffService = new StaffService(staffRepository, redeemRepository);
const redeemService: RedeemService  = new RedeemService(teamRepository, redeemRepository);
const teamService: TeamService = new TeamService(teamRepository, redeemRepository);
const parser: Parser = new Parser(staffService, teamService, redeemService);
const ui: UI = new UI();

// execute the mainApp and inject dep
const mainApp = new MainApp(ui, parser);
mainApp.start();
mainApp.runUntilExit();