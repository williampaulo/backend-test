import { Router } from 'express';

import RetailersController from '../controllers/RetailersController';
import ValidationMiddleware from '@shared/infra/http/middlewares/ValidationMiddleware';

const retailerRouter = Router();
const retailersController = new RetailersController();

retailerRouter.post(
  '/',
  ValidationMiddleware.createRetailer,
  retailersController.create,
);

export default retailerRouter;
