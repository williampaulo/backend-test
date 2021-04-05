import { Request, Response, NextFunction } from 'express';
// import { Errors } from 'validatejs';
import validate from '@helpers/validate';

const createRetailer = (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string',
    full_name: 'required|string',
    cpf: 'required|string|min:11',
  };

  validate(req.body, validationRule, {}, (err: any, status: any) => {
    if (!status) {
      res.status(412).send({
        statusCode: 412,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const createPurchase = (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    value: 'required|numeric',
    date: 'required|date',
  };

  validate(req.body, validationRule, {}, (err: any, status: any) => {
    if (!status) {
      res.status(412).send({
        statusCode: 412,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const updatePurchase = createPurchase;

const login = (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string',
  };

  validate(req.body, validationRule, {}, (err: any, status: any) => {
    if (!status) {
      res.status(412).send({
        statusCode: 412,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

export default {
  createRetailer,
  createPurchase,
  updatePurchase,
  login,
};
