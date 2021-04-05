import { verify } from 'jsonwebtoken';
import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  token: string;
}

type TokenPayload = {
  iat: number;
  eat: number;
  sub: string;
};

class RetailerAuthenticationValidationService {
  public execute(token: string): TokenPayload {
    if (!token || token === '') {
      throw new AppError('Missing token.');
    }

    const { secret } = configAuth.jwt;

    try {
      const decoded = verify(token, secret) as TokenPayload;
      return decoded;
    } catch {
      throw new AppError('Invalid token.', 401);
    }
  }
}

export default RetailerAuthenticationValidationService;
