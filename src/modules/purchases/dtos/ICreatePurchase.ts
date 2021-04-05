export default interface ICreatePurchase {
  value: number;
  date: Date;
  cashback_rate: number;
  cashback_value: number;
  retailer_cpf: string;
  status: string;
}
