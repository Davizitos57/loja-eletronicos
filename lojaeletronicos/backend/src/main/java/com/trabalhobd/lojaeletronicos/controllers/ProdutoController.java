package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Categoria;
import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.repositories.CategoriaRepository;
import com.trabalhobd.lojaeletronicos.services.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/loja/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final CategoriaRepository categoriaRepository;

    public ProdutoController(ProdutoService produtoService, CategoriaRepository categoriaRepository) {
        this.produtoService = produtoService;
        this.categoriaRepository = categoriaRepository;
    }

    public static String deAccent(String str) {
        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("imagemFile") MultipartFile imagemFile,
                                               @RequestParam("idCategoria") int idCategoria,
                                               @RequestParam("nomeProduto") String nomeProduto) {
        if (imagemFile.isEmpty()) {
            return ResponseEntity.badRequest().body("Por favor, selecione um arquivo para enviar.");
        }
        try {
            Categoria categoria = categoriaRepository.findById((long) idCategoria);
            if (categoria == null) {
                return ResponseEntity.badRequest().body("Categoria não encontrada.");
            }

            String nomeCategoriaSanitizado = deAccent(categoria.getNome())
                    .toLowerCase()
                    .replaceAll("\\s+", "-")
                    .replaceAll("[^a-z0-9-]", "");

            String nomeProdutoSanitizado = deAccent(nomeProduto)
                    .toLowerCase()
                    .replaceAll("\\s+", "-")
                    .replaceAll("[^a-z0-9-]", "");

            Path categoriaDir = Paths.get("uploads", nomeCategoriaSanitizado);
            if (!Files.exists(categoriaDir)) {
                Files.createDirectories(categoriaDir);
            }

            String originalFilename = imagemFile.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String finalFileName = nomeProdutoSanitizado + fileExtension;
            Path filePath = categoriaDir.resolve(finalFileName);

            Files.copy(imagemFile.getInputStream(), filePath);

            String fileUrl = "/uploads/" + nomeCategoriaSanitizado + "/" + finalFileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Falha ao fazer upload da imagem: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro inesperado: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Void> criarNovoProduto(@RequestBody Produto produto) {
        produtoService.criarNovoProduto(produto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Produto>> todosProdutos() {
        List<Produto> allProdutos = produtoService.listarTodosProdutos();
        return ResponseEntity.ok(allProdutos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> procurarProdutoPorID(@PathVariable Long id) {
        Produto achado = produtoService.procurarProdutoporId(id);
        if (achado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(achado);
    }

    @GetMapping("/nome")
    public ResponseEntity<List<Produto>> procurarProdutoporNome(@RequestParam String nome) {
        var produtos = produtoService.procuraProdutoporNome(nome);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<Produto>> buscarProdutosPorIdCategoria(@PathVariable("id") Long idCategoria) {
        List<Produto> produtos = produtoService.procurarProdutoporCategoria(idCategoria);
        return ResponseEntity.ok(produtos);
    }

    @PutMapping("/quantidade/{id}")
    public ResponseEntity<Void> atualizarQuantidadeProduto(@PathVariable Long id, @RequestParam int quantidade) {
        produtoService.atualizarQuantidadeProdutos(id, quantidade);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarDadosProduto(@PathVariable Long id, @RequestBody Produto produto) {
        produtoService.atualizarDadosProdutos(id, produto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProdutoPorID(@PathVariable Long id) {
        produtoService.deletarProdutoporId(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/soft/{id}")
    public ResponseEntity<Void> deletarLogicamenteProdutoPorID(@PathVariable Long id) {
        produtoService.deletarLogicamenteProdutoporId(id);
        return ResponseEntity.ok().build();
    }
}