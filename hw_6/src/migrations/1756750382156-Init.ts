import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756750382156 implements MigrationInterface {
    name = 'Init1756750382156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_f3da2059a86af58f909bded384c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news_post" ADD CONSTRAINT "FK_a3677e07ecbe41e4297ae33cb0a" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_post" DROP CONSTRAINT "FK_a3677e07ecbe41e4297ae33cb0a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "news_post"`);
    }

}
