import { injectable, inject } from 'tsyringe';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import IPurchaseRepository from '../repositories/IPurchaseRepository';
import ICashbackPolicy from '../policies/CashbackPolicy/models/ICashbackPolicy';
import IPurchaseStatusPolicy from '../policies/PurchaseStatusPolicy/models/IPurchaseStatusPolicy';
import AppError from '@shared/errors/AppError';

interface IRequest {
  code: string;
  value: number;
  date: Date;
  status: string;
}

type Response = Omit<Purchase, 'retailer_cpf'>;

@injectable()
class UpdateRetailerService {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,
    @inject('CashbackPolicy')
    private cashbackPolicy: ICashbackPolicy,
    @inject('PurchaseStatusPolicy')
    private purchaseStatusPolicy: IPurchaseStatusPolicy,
  ) {}

  public async execute(
    retailer_cpf: string,
    { code, value, date, status }: IRequest,
  ): Promise<Response> {
    const purchase = await this.purchaseRepository.findByCode(code);

    if (!purchase || purchase.retailer_cpf !== retailer_cpf) {
      throw new AppError('Purchase not found!');
    }

    const { STATUS_EM_AVALIACAO, STATUS_APROVADO } = this.purchaseStatusPolicy;
    const evaluateStatus = this.purchaseStatusPolicy.evaluateStatus();

    if (status === null || (status && !evaluateStatus.includes(status))) {
      throw new AppError(
        `You can only set the status to '${STATUS_APROVADO}'.`,
      );
    }

    if (purchase.status !== STATUS_EM_AVALIACAO) {
      throw new AppError(
        `Only purchases with '${STATUS_EM_AVALIACAO}' status can be edited.`,
      );
    }

    const formattedPrecisionValue = Number(Number(value).toFixed(2));
    const cashback_rate = this.cashbackPolicy.getRate(formattedPrecisionValue);
    const cashback_value = this.cashbackPolicy.calculeValue(
      formattedPrecisionValue,
    );

    const data = {
      code,
      value: formattedPrecisionValue,
      date,
      cashback_rate,
      cashback_value,
      retailer_cpf,
      status,
    };

    await this.purchaseRepository.save(data);

    // Object.assign(purchase, { ...data });

    return {
      code,
      value: formattedPrecisionValue,
      date,
      cashback_rate,
      cashback_value,
      status,
    };
  }
}

export default UpdateRetailerService;
