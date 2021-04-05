import 'reflect-metadata';
import FakePurchaseRepository from './../repositories/fakes/FakePurchaseRepository';
import CreatePurchaseService from './CreatePurchaseService';
import DeletePurchaseService from './DeletePurchaseService';
import CashbackPolicy from './../policies/CashbackPolicy/implementations/CashbackPolicy';
import PurchaseStatusPolicy from '../policies/PurchaseStatusPolicy/implementations/PurchaseStatusPolicy';
import AppError from '@shared/errors/AppError';

describe('Delete Purchase', () => {
  const CPF_STATUS_OK = '15350946056'; // cpf status 'Aprovado'
  const CPF_OTHER = '78753731077'; // cpf status 'Aprovado'
  it('should be able to delete a purchase', async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const deletePurchase = new DeletePurchaseService(fakePurchaseRepository);

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

    const purchase = await deletePurchase.execute(
      CPF_OTHER,
      createdPurchase.code,
    );

    expect(purchase).resolves;
  });

  it('should not be able to delete a purchase than does not exist', async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const deletePurchase = new DeletePurchaseService(fakePurchaseRepository);

    expect(deletePurchase.execute('code', 'test')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it("should not be able to delete a purchase with a status other than 'Em validação'", async () => {
    const fakePurchaseRepository = new FakePurchaseRepository();
    const cashbackPolicy = new CashbackPolicy();
    const purchaseStatusPolicy = new PurchaseStatusPolicy();

    const deletePurchase = new DeletePurchaseService(fakePurchaseRepository);
    const createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      cashbackPolicy,
      purchaseStatusPolicy,
    );

    const purchase = await createPurchase.execute({
      value: 100,
      date: new Date(),
      retailer_cpf: CPF_STATUS_OK,
    });

    expect(
      deletePurchase.execute(CPF_STATUS_OK, purchase.code),
    ).rejects.toBeInstanceOf(AppError);
  });
});
