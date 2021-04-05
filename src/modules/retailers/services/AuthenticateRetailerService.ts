import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRetailerRepository from '@modules/retailers/repositories/IRetailerRepository';
import Retailer from '@modules/retailers/infra/typeorm/entities/Retailer';
import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  retailer: Retailer;
  token: string;
}

@injectable()
class AuthenticateRetailerService {
  constructor(
    @inject('RetailerRepository')
    private retailerRepository: IRetailerRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // const hashedPassword = hash(password, 6);
    const retailer = await this.retailerRepository.findByEmail(email);

    if (!retailer) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      retailer.password,
    );
    if (passwordMatched === false) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = configAuth.jwt;

    const token = sign({}, secret, {
      subject: retailer.cpf,
      expiresIn: expiresIn,
    });

    return {
      retailer,
      token,
    };
  }
}

export default AuthenticateRetailerService;
