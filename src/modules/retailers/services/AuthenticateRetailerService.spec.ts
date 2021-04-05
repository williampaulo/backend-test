import 'reflect-metadata';

import AuthenticateRetailerService from './AuthenticateRetailerService';
import CreateRetailerService from './CreateRetailerService';
import FakeRetailerRepository from './../repositories/fakes/FakeRetailerRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('Authenticate Retailer', () => {
  it('should be able to authenticate a retailer', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );
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

    const retailer = await authenticateRetailer.execute({
      email: 'john@doe',
      password: '1234',
    });

    expect(retailer).toHaveProperty('token');
  });

  it('should not be able to authenticate wirh not existing retailer', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    expect(
      authenticateRetailer.execute({
        email: 'john@doe',
        password: '1234588548',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );
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
      authenticateRetailer.execute({
        email: 'john@doe',
        password: '1234-non',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
