import { getRepository, Repository } from 'typeorm';
import Retailer from '@modules/retailers/infra/typeorm/entities/Retailer';
import IRetailerRepository from '@modules/retailers/repositories/IRetailerRepository';
import ICreateRetailerDTO from '@modules/retailers/dtos/ICreateRetailerDTO';

class RetailerRepository implements IRetailerRepository {
  private ormRepository: Repository<Retailer>;

  constructor() {
    this.ormRepository = getRepository(Retailer);
  }

  // remove it!!!
  public async list(): Promise<Retailer[]> {
    return this.ormRepository.find();
  }

  public async findByCpf(cpf: string): Promise<Retailer | undefined> {
    return this.ormRepository.findOne({ where: { cpf } });
  }

  public async findByEmail(email: string): Promise<Retailer | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async create(data: ICreateRetailerDTO): Promise<Retailer> {
    const retailer = this.ormRepository.create(data);
    await this.ormRepository.save(retailer);

    return retailer;
  }
}

export default RetailerRepository;
