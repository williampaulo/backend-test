import { getRepository, Repository } from 'typeorm';
import IPurchaseRepository from '@modules/purchases/repositories/IPurchaseRepository';
import ICreatePurchase from '@modules/purchases/dtos/ICreatePurchase';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';

class PurchaseRepository implements IPurchaseRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async create(data: ICreatePurchase): Promise<Purchase> {
    const purchase = this.ormRepository.create(data);
    await this.ormRepository.save(purchase);
    return purchase;
  }

  public async delete(code: string): Promise<boolean> {
    const purchase = await this.ormRepository.delete(code);

    return purchase.affected === 0 ? false : true;
  }

  public async save(purchase: Purchase): Promise<Purchase> {
    return this.ormRepository.save(purchase);
  }

  public async findByCode(code: string): Promise<Purchase | undefined> {
    return this.ormRepository.findOne(code);
  }

  public async listByRetailer(retailer_cpf: string): Promise<Purchase[]> {
    return this.ormRepository.find({ where: { retailer_cpf } });
  }
}

export default PurchaseRepository;
