// ============================================================================
// CARDAPIO REPOSITORY (MODEL) — ponto único de acesso aos dados do cardápio.
// Encapsula a fonte de dados (mockDatabase) atrás de uma API tipada, para que
// os ViewModels nunca precisem conhecer os detalhes da simulação de I/O.
// ============================================================================

import { Categoria } from "./Categoria";
import { Produto } from "./Produto";
import {
  simularConsultaCategorias,
  simularConsultaProdutoPorId,
  simularConsultaProdutosPorCategoria,
} from "./mockDatabase";

export const CardapioRepository = {
  async buscarCategorias(): Promise<Categoria[]> {
    return simularConsultaCategorias();
  },

  async buscarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    return simularConsultaProdutosPorCategoria(categoriaId);
  },

  async buscarProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    return simularConsultaProdutoPorId(produtoId);
  },
};
