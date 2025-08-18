import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const useEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const { usuario, refreshUsuario } = useAuth();

  const fetchEnderecos = useCallback(async () => {
    // A dependência agora é o ID do usuário, que é mais estável.
    if (usuario?.id) {
      setLoading(true);
      try {
        const response = await api.get(`/enderecos?usuarioId=${usuario.id}`);
        const listaEnderecos = response.data || [];
        setEnderecos(listaEnderecos);

        // LÓGICA MELHORADA: Encontra o endereço principal ou seleciona o primeiro.
        if (listaEnderecos.length > 0) {
          const principal = listaEnderecos.find(e => e.principal) || listaEnderecos[0];
          setEnderecoSelecionado(principal);
        } else {
          // Se não houver endereços, garante que o estado seja nulo.
          setEnderecoSelecionado(null);
        }
      } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        setEnderecos([]);
        setEnderecoSelecionado(null);
      } finally {
        setLoading(false);
      }
    } else {
        // Limpa o estado se não houver usuário.
        setEnderecos([]);
        setEnderecoSelecionado(null);
    }
  }, [usuario?.id]); // A dependência agora é apenas o ID do usuário

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  const selecionarEndereco = (endereco) => {
    setEnderecoSelecionado(endereco);
  };

  const atualizarEndereco = async (idEndereco, dadosAtualizados) => {
    if (!usuario || !idEndereco) return;
    
    setLoading(true);
    try {
      const dadosParaApi = { ...dadosAtualizados, idUsuario: usuario.id };
      await api.put(`/enderecos/${idEndereco}`, dadosParaApi);
      
      // Após a atualização, o refresh do usuário e a nova busca de endereços
      // garantirão que a UI reflita o estado mais recente.
      await refreshUsuario();
      await fetchEnderecos(); 
      
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... (resto do seu código do hook useEndereco sem alterações)
  const calcularPrazoEntrega = (cep) => {
    if (!cep) return 0;
    const cepNumerico = cep.replace(/\D/g, '');
    const prefixo = parseInt(cepNumerico.substring(0, 2));
    if (prefixo >= 30000 && prefixo <= 39999) return 2;
    if (prefixo >= 1000 && prefixo <= 19999) return 1;
    if (prefixo >= 20000 && prefixo <= 28999) return 3;
    return 5;
  };

  const formatarCEP = (cep) => {
    if (!cep) return '';
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const obterEnderecoPrincipal = () => {
    return enderecos.find(endereco => endereco.principal) || enderecos[0];
  };

  const buscarEnderecosPorCEP = async (cep) => {
    try {
      console.log('Buscar endereço por CEP:', cep);
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
    }
  };


  return {
    enderecos,
    enderecoSelecionado,
    loading,
    selecionarEndereco,
    calcularPrazoEntrega,
    formatarCEP,
    obterEnderecoPrincipal,
    buscarEnderecosPorCEP,
    atualizarEndereco
  };
};