export default interface IPurchaseStatusPolicy {
  readonly STATUS_APROVADO: string;
  readonly STATUS_EM_AVALIACAO: string;
  getStatusByCpf(cpf: string): string;
  evaluateStatus(): string[];
}
