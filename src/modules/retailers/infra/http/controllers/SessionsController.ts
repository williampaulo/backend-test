import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateRetailerService from '@modules/retailers/services/AuthenticateRetailerService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateRetailerService);

    const { token } = await authenticateUser.execute({ email, password });

    return response
      .status(201)
      .json({ statusCode: 201, message: 'Generated token.', body: { token } });
  }
}
