import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePurchases1617332609396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases',
        columns: [
          {
            name: 'code',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'numeric(10,2)',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'cashback_rate',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'cashback_value',
            type: 'numeric(10,2)',
            isNullable: false,
          },
          {
            name: 'retailer_cpf',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // await queryRunner.createForeignKey(
    //   'purchases',
    //   new TableForeignKey({
    //     name: 'PurchasesRetailer',
    //     columnNames: ['retailer_cpf'],
    //     referencedColumnNames: ['cpf'],
    //     referencedTableName: 'retailers',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('purchases', 'PurchasesRetailer');
    await queryRunner.dropTable('purchases');
  }
}
