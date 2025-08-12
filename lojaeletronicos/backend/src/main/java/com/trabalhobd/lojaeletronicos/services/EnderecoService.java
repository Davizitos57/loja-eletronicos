package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public void criarEndereco(Endereco endereco) {
        enderecoRepository.create(endereco);
    }

    public void atualizarEndereco(Long id, Endereco endereco) {
        enderecoRepository.updateEnderecoData(id, endereco);
    }

    public Endereco buscarEndereco(Long id) {
        return enderecoRepository.findById(id);
    }

    public void deletarEndereco(Long enderecoId) {
        enderecoRepository.deleteById(enderecoId);
    }

    public List<Endereco> buscarEnderecoPorUsuarioId(Long id) {
        return enderecoRepository.findByUserId(id);
    }
}
