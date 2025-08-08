package com.trabalhobd.lojaeletronicos.services;

import org.springframework.stereotype.Service;

import com.trabalhobd.lojaeletronicos.models.Categoria;
import com.trabalhobd.lojaeletronicos.repositories.CategoriaRepository;

@Service
public class CategoriaService {
    
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public void criarNovaCategoria(Categoria categoria){
        categoriaRepository.create(categoria);
    }

    public Categoria procurarCategoriaPorID(Long idCategoria){
        return categoriaRepository.findById(idCategoria);
    }

    public Categoria procurarCategoriaPorNome(String nome){
        return categoriaRepository.findByNome(nome);
    }

    public void atualizarDadosCategoria(Long idCategoria, Categoria categoria){
        categoriaRepository.updateCategoriaData(idCategoria, categoria);
    }

}
