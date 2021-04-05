import { injectable, inject } from 'tsyringe';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import IPurchaseRepository from '../repositories/IPurchaseRepository';
import ICashbackPolicy from '../policies/CashbackPolicy/models/ICashbackPolicy';
import IPurchaseStatusPolicy from '../policies/PurchaseStatusPolicy/models/IPurchaseStatusPolicy';

interface IRequest {
  value: number;
  date: Date;
  retailer_cpf: string;
}

@injectable()
class CreatePurchaseService {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,
    @inject('CashbackPolicy')
    private cashbackPolicy: ICashbackPolicy,
    @inject('PurchaseStatusPolicy')
    private purchaseStatusPolicy: IPurchaseStatusPolicy,
  ) {}

  public async execute({
    value,
    date,
    retailer_cpf,
  }: IRequest): Promise<Purchase> {
    const formattedPrecisionValue = Number(value.toFixed(2));
    const cashback_rate = this.cashbackPolicy.getRate(formattedPrecisionValue);
    const cashback_value = this.cashbackPolicy.calculeValue(
      formattedPrecisionValue,
    );

    const status = this.purchaseStatusPolicy.getStatusByCpf(retailer_cpf);

    const purchase = await this.purchaseRepository.create({
      value: formattedPrecisionValue,
      date,
      cashback_rate,
      cashback_value,
      retailer_cpf,
      status,
    });

    return purchase;
  }
}

export default CreatePurchaseService;
