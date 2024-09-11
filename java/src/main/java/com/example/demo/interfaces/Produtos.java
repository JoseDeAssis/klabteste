package com.example.demo.interfaces;

import java.sql.SQLException;
import java.util.Map;

//Comunicação com a camada de negócio da aplicação
public interface Produtos {

    public void insertProduct(Map<String, Object> product) throws SQLException;

    public Object getAllProducts() throws SQLException ;

    public Object getProductById(long id) throws SQLException;

    public void atualizarQuantidadeProduto(long produtoId, int quantidadeVendida) throws SQLException;

    public void atualizarPrecoEQuantidadeProduto(long id, Map<String, Object> product) throws SQLException;
}
