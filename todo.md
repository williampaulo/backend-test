### Requisitos back-end:

[x] Rota para cadastrar um novo revendedor(a) exigindo no mínimo nome completo, CPF, email e senha;
[x] Rota para validar um login de um revendedor(a);
[x] Rota para cadastrar uma nova compra exigindo no mínimo código, valor, data e CPF do
revendedor(a). Todos os cadastros são salvos com o status “Em validação” exceto quando
o CPF do revendedor(a) for 153.509.460-56, neste caso o status é salvo como “Aprovado”;
[x] Rota para editar uma compra, permitir editar apenas se o status da venda for “Em
validação”;
[x] Rota para excluir uma compra, permitir exclusão apenas se o status da venda for “Em
validação”;
[x] Rota para listar as compras cadastradas retornando código, valor, data, % de cashback
aplicado para esta compra, valor de cashback para esta compra e status;
[x] Rota para exibir o acumulado de cashback até o momento, essa rota irá consumir essa
informação de uma API externa disponibilizada pelo Boticário

### Premissas do caso de uso:

- Os critérios de bonificação são:
  [x] Para até 1.000 reais em compras, o revendedor(a) receberá 10% de cashback do
  valor vendido no período;
  [x] Entre 1.000 e 1.500 reais em compras, o revendedor(a) receberá 15% de cashback do valor vendido no período;
  [x] Acima de 1.500 reais em compras, o revendedor(a) receberá 20% de cashback do valor vendido no período.
