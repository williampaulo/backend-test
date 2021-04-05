import Purchase from './../infra/typeorm/entities/Purchase';
import ICreatePurchase from './../dtos/ICreatePurchase';

export default interface IPurchaseRepository {
  create(data: ICreatePurchase): Promise<Purchase>;
  delete(code: string): Promise<boolean>;
  save(purchase: Purchase): Promise<Purchase>;
  findByCode(code: string): Promise<Purchase | undefined>;
  listByRetailer(retailer_cpf: string): Promise<Purchase[]>;
}
