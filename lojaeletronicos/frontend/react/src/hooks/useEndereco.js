import { useState, useEffect } from 'react';
import { enderecosUsuarioMock, enderecoEntregaMock } from '../data/enderecoMock.js';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const useEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const { usuario } = useAuth(); 

  useEffect(() => {
    const fetchEnderecos = async () => {
      if (usuario && usuario.enderecos && usuario.enderecos.length > 0) {
        setEnderecos(usuario.enderecos);
        setEnderecoSelecionado(usuario.enderecos[0]); 
        return; 
      }

      if (usuario && usuario.id) {
        setLoading(true);
        try {
          const response = await api.get(`/enderecos?usuarioId=${usuario.id}`);
          setEnderecos(response.data);
          if (response.data.length > 0) {
            setEnderecoSelecionado(response.data[0]);
          }
        } catch (error) {
          console.error("Erro ao buscar endereços:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEnderecos();
  }, [usuario]);

  const selecionarEndereco = (endereco) => {
    setEnderecoSelecionado(endereco);
  };

  const calcularPrazoEntrega = (cep) => {
    const cepNumerico = cep.replace(/\D/g, '');
    const prefixo = parseInt(cepNumerico.substring(0, 2));
    
    if (prefixo >= 30000 && prefixo <= 39999) return 2; 
    if (prefixo >= 1000 && prefixo <= 19999) return 1;   
    if (prefixo >= 20000 && prefixo <= 28999) return 3;  
    return 5; 
  };

  const formatarCEP = (cep) => {
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
    buscarEnderecosPorCEP
  };
};