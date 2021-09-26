import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1632246759400 implements MigrationInterface {
  name = 'init1632246759400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying NOT NULL, "imageFileName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d"`,
    );
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
