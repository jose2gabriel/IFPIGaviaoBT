// ============================================================================
// VIEWMODEL — Tela de Detalhes do Produto
// Concentra o estado de carregamento, a busca assíncrona do produto e as
// regras de negócio de incremento/decremento da quantidade selecionada.
// ============================================================================

import { useEffect, useState } from "react";
import { CardapioRepository } from "@/models/CardapioRepository";
import { Produto } from "@/models/Produto";
import { formatarPreco } from "./formatters";

export function useItemDetailViewModel(produtoId?: string) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<Produto | undefined>(undefined);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhes() {
      if (!produtoId) return;
      try {
        setCarregando(true);
        const resultado = await CardapioRepository.buscarProdutoPorId(
          produtoId
        );
        if (ativo) setProduto(resultado);
      } catch (erro) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDetalhes();
    return () => {
      ativo = false;
    };
  }, [produtoId]);

  function decrementarQuantidade() {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function incrementarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  return {
    carregando,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  };
}
