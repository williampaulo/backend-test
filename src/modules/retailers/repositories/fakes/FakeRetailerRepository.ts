import Retailer from '@modules/retailers/infra/typeorm/entities/Retailer';
import IRetailerRepository from '@modules/retailers/repositories/IRetailerRepository';
import ICreateRetailerDTO from '@modules/retailers/dtos/ICreateRetailerDTO';

class FakeRetailerRepository implements IRetailerRepository {
  private retailers: Retailer[] = [];

  public async findByCpf(cpf: string): Promise<Retailer | undefined> {
    return this.retailers.find(item => item.cpf === cpf);
  }

  public async findByEmail(email: string): Promise<Retailer | undefined> {
    return this.retailers.find(item => item.email === email);
  }

  public async create(data: ICreateRetailerDTO): Promise<Retailer> {
    const retailer = new Retailer();
    Object.assign(retailer, data);
    this.retailers.push(retailer);
    return retailer;
  }
}

export default FakeRetailerRepository;
