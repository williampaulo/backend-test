import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import ValidationMiddleware from '@shared/infra/http/middlewares/ValidationMiddleware';

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.use(ValidationMiddleware.login);

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
