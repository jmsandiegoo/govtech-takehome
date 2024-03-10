import { Kysely, PostgresDialect } from "kysely";
import { DB } from 'kysely-codegen';
import { Pool } from 'pg';

export class Database {
    private static db: Kysely<DB>;

    public static getInstance(): Kysely<DB>{
        if (!Database.db) {
            Database.db = new Kysely<DB>({
                dialect: new PostgresDialect({
                    pool: new Pool({
                      database: process.env.DATABASE_NAME,
                      host: process.env.HOST,
                      user: process.env.USERNAME,
                      port: process.env.PORT ? Number(process.env.PORT) : undefined,
                      max: 10,
                    })
                  })
            })
        }
        
        return Database.db;
    }
}