// ============================================================================
// VIEWMODEL — Tela de Categoria (Listagem de Itens)
// Concentra o estado de carregamento, a busca assíncrona dos produtos da
// categoria selecionada e a resolução do título amigável da categoria.
// ============================================================================

import { useEffect, useState } from "react";
import { CardapioRepository } from "@/models/CardapioRepository";
import { Produto } from "@/models/Produto";
import { formatarPreco } from "./formatters";

const NOMES_CATEGORIA: Record<string, string> = {
  comidas: "Comidas",
  bebidas: "Bebidas",
};

export function useCategoryViewModel(categoriaId?: string) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const nomeCategoria = categoriaId
    ? NOMES_CATEGORIA[categoriaId] ?? "Cardápio"
    : "Cardápio";

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      if (!categoriaId) return;
      try {
        setCarregando(true);
        const resultado = await CardapioRepository.buscarProdutosPorCategoria(
          categoriaId
        );
        if (ativo) setProdutos(resultado);
      } catch (erro) {
        console.error("Erro ao buscar produtos da categoria:", erro);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarProdutos();
    return () => {
      ativo = false;
    };
  }, [categoriaId]);

  return { carregando, produtos, nomeCategoria, formatarPreco };
}
