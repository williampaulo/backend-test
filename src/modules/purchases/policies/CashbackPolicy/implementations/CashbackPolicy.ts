import ICashbackPolicy from '../models/ICashbackPolicy';

export default class CashbackPolicy implements ICashbackPolicy {
  private static RATE_10 = 10;
  private static RATE_15 = 15;
  private static RATE_20 = 20;

  public getRate(payment_value: number) {
    if (payment_value <= 1000) {
      return CashbackPolicy.RATE_10;
    } else if (payment_value >= 1000 && payment_value <= 1500) {
      return CashbackPolicy.RATE_15;
    } else {
      return CashbackPolicy.RATE_20;
    }
  }

  public calculeValue(payment_value: number) {
    const rate = this.getRate(payment_value) / 100;
    return Number((payment_value * rate).toFixed(2));
  }
}
