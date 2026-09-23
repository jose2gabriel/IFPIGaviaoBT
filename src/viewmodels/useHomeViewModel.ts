// ============================================================================
// VIEWMODEL — Tela Inicial (Categorias)
// Concentra o estado de carregamento e a busca assíncrona de categorias.
// A View apenas consome os valores retornados aqui.
// ============================================================================

import { useEffect, useState } from "react";
import { CardapioRepository } from "@/models/CardapioRepository";
import { Categoria } from "@/models/Categoria";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        setCarregando(true);
        const resultado = await CardapioRepository.buscarCategorias();
        if (ativo) setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDados();
    return () => {
      ativo = false;
    };
  }, []);

  return { carregando, categorias };
}
