import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRetailers1617330292528
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'retailers',
        columns: [
          {
            name: 'cpf',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('retailers');
  }
}
