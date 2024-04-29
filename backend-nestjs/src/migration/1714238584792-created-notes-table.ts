import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedNotesTable1714238584792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        create table notes (
            id bigserial primary key,
            name text,
            completed boolean not null default false
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table notes;`);
    }

}
