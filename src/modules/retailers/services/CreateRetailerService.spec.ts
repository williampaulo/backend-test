import 'reflect-metadata';
import CreateRetailerService from './CreateRetailerService';
import FakeRetailerRepository from './../repositories/fakes/FakeRetailerRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('Create Retailer', () => {
  it('should be able to create a new retailer', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createRetailer = new CreateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    const retailer = await createRetailer.execute({
      cpf: '42264426950',
      email: 'john@doe',
      full_name: 'John Doe',
      password: '1234',
    });

    expect(retailer.cpf).toBe('42264426950');
  });

  it('should not be able to create two retailer with same cpf', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createRetailer = new CreateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    await createRetailer.execute({
      cpf: '42264426950',
      email: 'john@doe',
      full_name: 'John Doe',
      password: '1234',
    });

    expect(
      createRetailer.execute({
        cpf: '42264426950',
        email: 'john@doe',
        full_name: 'John Doe',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two retailer with same email', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createRetailer = new CreateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    await createRetailer.execute({
      cpf: '42264426950',
      email: 'john@doe.ca',
      full_name: 'John Doe',
      password: '1234',
    });

    expect(
      createRetailer.execute({
        cpf: '42264426951',
        email: 'john@doe.ca',
        full_name: 'John Doe',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
