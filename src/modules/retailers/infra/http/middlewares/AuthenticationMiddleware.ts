import { Request, Response, NextFunction } from 'express';
// import AuthenticateRetailerService from '@modules/retailers/services/AuthenticateRetailerService';
import RetailerAuthenticationValidationService from '@modules/retailers/services/RetailerAuthenticationValidationService';
import AppError from '@shared/errors/AppError';

// const login = async (req: Request, res: Response, _: NextFunction) => {
//   const { email, password } = req.body;

//   const authenticateUser = new AuthenticateRetailerService();

//   const { token } = await authenticateUser.execute({
//     email,
//     password,
//   });

//   return res.status(200).send({ statusCode: 200, token });
// };

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError('Token is missing!');
  }

  const [, token] = authorization.split(' ');
  const validAuthenticationUser = new RetailerAuthenticationValidationService();

  const validAuthentication = await validAuthenticationUser.execute(token);

  if (!validAuthentication) {
    throw new AppError('Token is uninformed!');
  }

  const { sub } = validAuthentication;

  req.retailer_cpf = sub;

  next();
};

export default {
  verify,
};
