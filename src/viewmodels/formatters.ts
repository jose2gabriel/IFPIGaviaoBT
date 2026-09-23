// ============================================================================
// Formatadores compartilhados entre ViewModels — transformam dados do Model
// em texto pronto para exibição, para que as Views não façam esse cálculo.
// ============================================================================

export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
