import 'reflect-metadata';
import { hash } from 'bcryptjs';

import RetailerAuthenticationValidationService from './RetailerAuthenticationValidationService';
import AuthenticateRetailerService from './AuthenticateRetailerService';
import FakeRetailerRepository from './../repositories/fakes/FakeRetailerRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('Retailer Authentication Validation', () => {
  it('must be able to validate retailer authentication', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const retailerAuthenticationValidation = new RetailerAuthenticationValidationService();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    await fakeRetailerRepository.create({
      cpf: '42264426950',
      email: 'john@doe',
      full_name: 'John Doe',
      password: '1234',
    });

    const authenticate = await authenticateRetailer.execute({
      email: 'john@doe',
      password: '1234',
    });

    const validate = await retailerAuthenticationValidation.execute(
      authenticate.token,
    );

    expect(validate).toHaveProperty('sub');
    expect(validate.sub).toBe('42264426950');
  });

  it('must be able to validate failed email in authentication', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const retailerAuthenticationValidation = new RetailerAuthenticationValidationService();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    await fakeRetailerRepository.create({
      cpf: '42264426950',
      email: 'john@doe',
      full_name: 'John Doe',
      password: '1234',
    });

    expect(
      authenticateRetailer.execute({
        email: 'john@doe2',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to validate failed password in authentication', async () => {
    const fakeRetailerRepository = new FakeRetailerRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateRetailer = new AuthenticateRetailerService(
      fakeRetailerRepository,
      fakeHashProvider,
    );

    await fakeRetailerRepository.create({
      cpf: '42264426950',
      email: 'john@doe',
      full_name: 'John Doe',
      password: '1234',
    });

    const data = {
      email: 'john@doe',
      password: '12345',
    };

    expect(authenticateRetailer.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to validate missing token', async () => {
    const retailerAuthenticationValidation = new RetailerAuthenticationValidationService();

    try {
      retailerAuthenticationValidation.execute('');
    } catch ({ message }) {
      expect(message).toBe('Missing token.');
    }
  });

  it('must be able to validate token', async () => {
    const retailerAuthenticationValidation = new RetailerAuthenticationValidationService();

    try {
      retailerAuthenticationValidation.execute('adsad154as1d5sad5sa');
    } catch ({ message }) {
      expect(message).toBe('Invalid token.');
    }
  });
});
