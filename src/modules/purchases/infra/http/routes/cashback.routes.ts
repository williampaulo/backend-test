import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import AuthenticationMiddleware from '@modules/retailers/infra/http/middlewares/AuthenticationMiddleware';
import PurchaseCashbackController from '@modules/purchases/infra/http/controllers/PurchaseCashbackController';

const router = Router();
const purchaseCashbackController = new PurchaseCashbackController();

router.use(AuthenticationMiddleware.verify);

router.get('/', purchaseCashbackController.index);

export default router;
