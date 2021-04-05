import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRetailerService from '@modules/retailers/services/CreateRetailerService';

export default class RetailersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { full_name, cpf, email, password } = request.body;

    const createRetailer = container.resolve(CreateRetailerService);

    const retailer = await createRetailer.execute({
      cpf,
      full_name,
      email,
      password,
    });

    delete retailer.password;

    return response
      .status(201)
      .json({ statusCode: 201, message: 'Created retailer.', body: retailer });
  }
}
