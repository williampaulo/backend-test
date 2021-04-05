import { Request, Response } from 'express';
import fetch from 'node-fetch';

const api_url =
  'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323';
const token = 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm';

export default class PurchaseCashbackController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { retailer_cpf } = req;
    const api_response = await fetch(api_url, { headers: { token } });
    const api_data = await api_response.json();

    return res.json(api_data);
  }
}
