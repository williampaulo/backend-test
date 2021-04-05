import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column('money')
  value: number;

  @Column('timestamp without time zone')
  date: Date;

  @Column('integer')
  cashback_rate: number;

  @Column('money')
  cashback_value: number;

  @Column('bigint')
  retailer_cpf: string;

  @Column('varchar')
  status: string;
}

export default Purchase;
