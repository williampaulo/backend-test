import 'reflect-metadata';
import FakePurchaseRepository from './../repositories/fakes/FakePurchaseRepository';
import CashbackPolicy from './../policies/CashbackPolicy/implementations/CashbackPolicy';
import PurchaseStatusPolicy from '../policies/PurchaseStatusPolicy/implementations/PurchaseStatusPolicy';
import CreatePurchaseService from './CreatePurchaseService';

import AppError from '@shared/errors/AppError';

describe('Create Purchase', () => {
  const CPF_STATUS_OK = '15350946056'; // cpf status 'Aprovado'
  const CPF_OTHER = '78753731077'; // cpf status 'Aprovado'

  it('should be able to create a new purchase', async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const purchase = await createPurchase.execute({
      value: 150,
      date: new Date(),
      retailer_cpf: CPF_OTHER,
    });

    expect(purchase).toHaveProperty('code');
  });

  it("should be able to create a new purchase with 'Aprovado' status", async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const purchase = await createPurchase.execute({
      value: 150,
      date: new Date(),
      retailer_cpf: CPF_STATUS_OK,
    });

    expect(purchase.status).toBe('Aprovado');
  });
});
