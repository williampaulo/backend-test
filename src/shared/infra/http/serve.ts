import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware';

const app = express();

app.use(express.json());
app.use('/', routes);
app.use(ErrorHandlingMiddleware);

app.listen(3333, () => {
  console.log('Back-end is listening on port 3333');
});
