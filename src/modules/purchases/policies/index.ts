import { container } from 'tsyringe';

import ICashbackPolicy from './CashbackPolicy/models/ICashbackPolicy';
import CashbackPolicy from './CashbackPolicy/implementations/CashbackPolicy';

container.registerSingleton<ICashbackPolicy>('CashbackPolicy', CashbackPolicy);

import IPurchaseStatusPolicy from './PurchaseStatusPolicy/models/IPurchaseStatusPolicy';
import PurchaseStatusPolicy from './PurchaseStatusPolicy/implementations/PurchaseStatusPolicy';

container.registerSingleton<IPurchaseStatusPolicy>(
  'PurchaseStatusPolicy',
  PurchaseStatusPolicy,
);
