import Retailer from './../infra/typeorm/entities/Retailer';
import ICreateRetailerDTO from './../dtos/ICreateRetailerDTO';

export default interface IRetailerRepository {
  create(data: ICreateRetailerDTO): Promise<Retailer>;
  findByCpf(cpf: string): Promise<Retailer | undefined>;
  findByEmail(email: string): Promise<Retailer | undefined>;
}
