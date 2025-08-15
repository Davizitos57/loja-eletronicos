import { useState, useEffect } from 'react';
import { enderecosUsuarioMock, enderecoEntregaMock } from '../data/enderecoMock.js';

export const useEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simula carregamento dos endereços
    setLoading(true);
    setTimeout(() => {
      setEnderecos(enderecosUsuarioMock);
      setEnderecoSelecionado(enderecoEntregaMock);
      setLoading(false);
    }, 500);
  }, []);

  const selecionarEndereco = (endereco) => {
    setEnderecoSelecionado(endereco);
  };

  const calcularPrazoEntrega = (cep) => {
    const cepNumerico = cep.replace(/\D/g, '');
    const prefixo = parseInt(cepNumerico.substring(0, 2));
    
    // Simula prazos diferentes por região
    if (prefixo >= 30000 && prefixo <= 39999) return 2; // MG
    if (prefixo >= 1000 && prefixo <= 19999) return 1;   // SP
    if (prefixo >= 20000 && prefixo <= 28999) return 3;  // RJ
    return 5; // Outras regiões
  };

  const formatarCEP = (cep) => {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const obterEnderecoPrincipal = () => {
    return enderecos.find(endereco => endereco.principal) || enderecos[0];
  };

  // Função para futura integração com API
  const buscarEnderecosPorCEP = async (cep) => {
    try {
      // Aqui você fará a chamada para a API do backend
      // return await api.get(`/enderecos/buscar-cep/${cep}`);
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
    buscarEnderecosPorCEP
  };
};