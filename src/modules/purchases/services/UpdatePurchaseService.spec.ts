import 'reflect-metadata';
import FakePurchaseRepository from './../repositories/fakes/FakePurchaseRepository';
import CreatePurchaseService from './CreatePurchaseService';
import UpdatePurchaseService from './UpdatePurchaseService';
import CashbackPolicy from './../policies/CashbackPolicy/implementations/CashbackPolicy';
import PurchaseStatusPolicy from '../policies/PurchaseStatusPolicy/implementations/PurchaseStatusPolicy';
import AppError from '@shared/errors/AppError';

describe('Delete Purchase', () => {
  const CPF_STATUS_OK = '15350946056'; // cpf status 'Aprovado'
  const CPF_OTHER = '78753731077'; // cpf status 'Aprovado'

  it('should be able to update a purchase', async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const updatePurchase = new UpdatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );
    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const createdPurchase = await createPurchase.execute({
      value: 999,
      date: new Date(),
      retailer_cpf: CPF_OTHER,
    });

    Object.assign(createdPurchase, { value: 890 });

    const purchase = await updatePurchase.execute(CPF_OTHER, createdPurchase);

    expect(purchase.value).toBe(890);
    expect(purchase.cashback_value).toBe(89);
  });

  it('should not be able to update a purchase that does not belong to him', async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const updatePurchase = new UpdatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );
    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const createdPurchase = await createPurchase.execute({
      value: 99.9,
      date: new Date(),
      retailer_cpf: CPF_OTHER,
    });

    expect(
      updatePurchase.execute(CPF_STATUS_OK, createdPurchase),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a purchase with a status other than 'Em validação'", async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );
    const updatePurchase = new UpdatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const purchase = await createPurchase.execute({
      value: 100,
      date: new Date(),
      retailer_cpf: CPF_STATUS_OK,
    });

    Object.assign(purchase, { value: 150 });

    expect(
      updatePurchase.execute(CPF_STATUS_OK, purchase),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the status to values ​​other than 'Em validação' and 'Aprovado'", async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );
    const updatePurchase = new UpdatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const purchase = await createPurchase.execute({
      value: 100,
      date: new Date(),
      retailer_cpf: CPF_OTHER,
    });

    Object.assign(purchase, { status: 'Outro Status' });

    expect(updatePurchase.execute(CPF_OTHER, purchase)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
