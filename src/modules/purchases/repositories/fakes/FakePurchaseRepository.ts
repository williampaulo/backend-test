import { v4 as uuid } from 'uuid';
import IPurchaseRepository from '@modules/purchases/repositories/IPurchaseRepository';
import ICreatePurchase from '@modules/purchases/dtos/ICreatePurchase';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import AppError from '@shared/errors/AppError';

export default class FakePurchaseRepository implements IPurchaseRepository {
  private purchases: Purchase[] = [];

  public async create(data: ICreatePurchase): Promise<Purchase> {
    const purchase = new Purchase();
    Object.assign(purchase, { code: uuid(), ...data });
    this.purchases.push(purchase);
    return purchase;
  }

  public async delete(code: string): Promise<boolean> {
    const purchaseIndex = this.purchases.findIndex(item => item.code === code);
    if (purchaseIndex < 0) {
      // throw new AppError('Purchase does not exist.');
      return false;
    }

    this.purchases.slice(purchaseIndex, 1);

    return true;
  }

  public async save(data: Purchase): Promise<Purchase> {
    const purchaseIndex = this.purchases.findIndex(
      item => item.code === data.code,
    );
    if (purchaseIndex < 0) {
      this.purchases.push(data);
      return data;
    }

    Object.assign(this.purchases[purchaseIndex], data);

    return this.purchases[purchaseIndex];
  }

  public async findByCode(code: string): Promise<Purchase | undefined> {
    return this.purchases.find(item => item.code === code);
  }

  public async listByRetailer(retailer_cpf: string): Promise<Purchase[]> {
    return this.purchases.filter(item => item.retailer_cpf === retailer_cpf);
  }
}
