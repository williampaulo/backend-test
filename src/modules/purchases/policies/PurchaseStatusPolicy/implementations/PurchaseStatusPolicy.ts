import IPurchaseStatusPolicy from '../models/IPurchaseStatusPolicy';

export default class PurchaseStatusProvider implements IPurchaseStatusPolicy {
  public readonly STATUS_APROVADO = 'Aprovado';
  public readonly STATUS_EM_AVALIACAO = 'Em validação';
  private readonly CPF = '15350946056';

  public getStatusByCpf(cpf: string): string {
    if (cpf === this.CPF) {
      return this.STATUS_APROVADO;
    } else {
      return this.STATUS_EM_AVALIACAO;
    }
  }

  public evaluateStatus(): string[] {
    return [this.STATUS_APROVADO, this.STATUS_EM_AVALIACAO];
  }
}
