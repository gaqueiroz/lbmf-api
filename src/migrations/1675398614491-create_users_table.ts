import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { USERS_TABLE } from '~/users/users.constants';

export class createUsersTable1675398614491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'Id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'CreateDate',
            type: 'datetime',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USERS_TABLE);
  }
}
