import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('retailers')
class Retailer {
  @PrimaryColumn('bigint')
  cpf: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default Retailer;

// export const retailers: Retailer[] = [
//   {
//     cpf: '12345678912',
//     full_name: 'william paulo',
//     email: 'william@william.com',
//     password: 'teste',
//   },
// ];
