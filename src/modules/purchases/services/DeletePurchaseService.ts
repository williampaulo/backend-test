import { injectable, inject } from 'tsyringe';
import IPurchaseRepository from '../repositories/IPurchaseRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteRetailerService {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,
  ) {}

  public async execute(retailer_cpf: string, code: string): Promise<void> {
    const purchase = await this.purchaseRepository.findByCode(code);

    if (!purchase || purchase.retailer_cpf !== retailer_cpf) {
      throw new AppError('Purchase does not exist.');
    }

    if (purchase.status === 'Aprovado') {
      throw new AppError(
        "Only purchases with 'Em validação' status can be deleted.",
      );
    }

    await this.purchaseRepository.delete(code);
  }
}

export default DeleteRetailerService;
