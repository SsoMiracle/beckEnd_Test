import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddDeletedAndRenameTitle implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // users: add deleted
        await queryRunner.addColumn("user", new TableColumn({
            name: "deleted",
            type: "boolean",
            isNullable: false,
            default: false,
        }));

        // add index on email
        await queryRunner.createIndex("user", new TableIndex({
            name: "IDX_USER_EMAIL",
            columnNames: ["email"],
        }));

        // news_post: add deleted
        await queryRunner.addColumn("news_post", new TableColumn({
            name: "deleted",
            type: "boolean",
            isNullable: false,
            default: false,
        }));

        // rename title → header
        await queryRunner.renameColumn("news_post", "title", "header");

        // add index on deleted
        await queryRunner.createIndex("news_post", new TableIndex({
            name: "IDX_NEWS_DELETED",
            columnNames: ["deleted"],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // revert news_post
        await queryRunner.dropIndex("news_post", "IDX_NEWS_DELETED");
        await queryRunner.renameColumn("news_post", "header", "title");
        await queryRunner.dropColumn("news_post", "deleted");

        // revert user
        await queryRunner.dropIndex("user", "IDX_USER_EMAIL");
        await queryRunner.dropColumn("user", "deleted");
    }
}
