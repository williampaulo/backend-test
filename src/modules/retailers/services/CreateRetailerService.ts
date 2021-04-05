import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRetailerRepository from '@modules/retailers/repositories/IRetailerRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  cpf: string;
  full_name: string;
  email: string;
  password: string;
}

interface IResponse {
  cpf: string;
  full_name: string;
  email: string;
  password?: string;
}

@injectable()
class CreateRetailerService {
  constructor(
    @inject('RetailerRepository')
    private retailerRepository: IRetailerRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    cpf,
    full_name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const retailerFounded = await this.retailerRepository.findByCpf(cpf);

    if (retailerFounded) {
      throw new AppError('This Retailer is already created.');
    }

    const retailerEmailFounded = await this.retailerRepository.findByEmail(
      email,
    );

    if (retailerEmailFounded) {
      throw new AppError('Email is already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const retailer = await this.retailerRepository.create({
      cpf,
      full_name,
      email,
      password: hashedPassword,
    });

    return retailer;
  }
}

export default CreateRetailerService;
