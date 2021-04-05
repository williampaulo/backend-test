import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';

import PurchasesController from '../controllers/PurchasesController';
import ValidationMiddleware from '@shared/infra/http/middlewares/ValidationMiddleware';
import AuthenticationMiddleware from '@modules/retailers/infra/http/middlewares/AuthenticationMiddleware';

const router = Router();
const purchasesController = new PurchasesController();

router.use(AuthenticationMiddleware.verify);

router.get('/', purchasesController.index);

router.post(
  '/',
  ValidationMiddleware.createPurchase,
  purchasesController.create,
);

router.put(
  '/:code',
  ValidationMiddleware.updatePurchase,
  purchasesController.update,
);

router.delete('/:code', purchasesController.delete);

export default router;
