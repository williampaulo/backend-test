import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PurchaseRepository from '@modules/purchases/infra/typeorm/repositories/PurchaseRepository';
import CreatePurchaseService from '@modules/purchases/services/CreatePurchaseService';
import UpdatePurchaseService from '@modules/purchases/services/UpdatePurchaseService';
import DeletePurchaseService from '@modules/purchases/services/DeletePurchaseService';

export default class PurchasesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { retailer_cpf } = req;
    const purchaseRepository = new PurchaseRepository();
    const purchases = await purchaseRepository.listByRetailer(retailer_cpf);

    return res.json({
      statusCode: 200,
      message: 'Purchase listed.',
      body: purchases,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { value, date } = req.body;
    const { retailer_cpf } = req;

    const createPurchase = container.resolve(CreatePurchaseService);
    const purchase = await createPurchase.execute({
      value,
      date,
      retailer_cpf,
    });

    return res.json({
      statusCode: 201,
      message: 'Created purchase.',
      body: purchase,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { retailer_cpf } = req;
    const { code } = req.params;
    const { value, date, status } = req.body;

    const updatePurchase = container.resolve(UpdatePurchaseService);

    const purchase = await updatePurchase.execute(retailer_cpf, {
      code,
      value,
      date,
      status,
    });

    return res.json({
      statusCode: 200,
      message: 'Edited purchase.',
      body: purchase,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;
    const { retailer_cpf } = req;

    const deletePurchaseService = container.resolve(DeletePurchaseService);

    await deletePurchaseService.execute(retailer_cpf, code);

    return res.status(204).send();
  }
}
