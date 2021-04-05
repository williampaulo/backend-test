import { container } from 'tsyringe';

import '@modules/retailers/providers';
import '@modules/purchases/policies';

import IRetailerRepository from '@modules/retailers/repositories/IRetailerRepository';
import RetailerRepository from '@modules/retailers/infra/typeorm/repositories/RetailerRepository';

import IPurchaseRepository from '@modules/purchases/repositories/IPurchaseRepository';
import PurchaseRepository from '@modules/purchases/infra/typeorm/repositories/PurchaseRepository';

container.registerSingleton<IRetailerRepository>(
  'RetailerRepository',
  RetailerRepository,
);

container.registerSingleton<IPurchaseRepository>(
  'PurchaseRepository',
  PurchaseRepository,
);
