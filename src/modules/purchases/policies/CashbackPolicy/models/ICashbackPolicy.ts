export default interface ICashbackPolicy {
  getRate(payment_value: number): number;
  calculeValue(payment_value: number): number;
}
