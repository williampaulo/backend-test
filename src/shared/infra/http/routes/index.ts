import { Router, Request, Response, NextFunction } from 'express';
import sessionsRouter from '@modules/retailers/infra/http/routes/sessions.routes';
import retailersRouter from '@modules/retailers/infra/http/routes/retailers.routes';
import purchasesRouter from '@modules/purchases/infra/http/routes/purchases.routes';
import cashbackRouter from '@modules/purchases/infra/http/routes/cashback.routes';

const router = Router();

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const log = `[${method.toUpperCase()}] ${url}`;
  console.time(log);
  next();
  console.timeEnd(log);
};

router.use(logRequest);
router.use('/sessions', sessionsRouter);
router.use('/retailers', retailersRouter);
router.use('/purchases', purchasesRouter);
router.use('/cashback', cashbackRouter);

export default router;
