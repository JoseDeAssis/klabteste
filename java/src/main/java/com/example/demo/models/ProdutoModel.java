package com.example.demo.models;

import com.example.demo.interfaces.Produtos;
import com.example.demo.services.NativeScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * Construa suas regras de negócio da forma que for necessária.
 * Se basear nos exemplos abaixo, complementando-os, ou até mesmo melhorando-os.
 * As operações no devem ser feitas por meio de strings SQL.
 */
@Service
public class ProdutoModel implements Produtos {

    @Autowired
    private NativeScriptService nativeScriptService;

    public Object getAllProducts() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            List<Map<String, Object>> listMap = new ArrayList<>();

            //Construção da string SQL
            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM produtos;");

            //Abertura da conexão com o banco e abertura da PreparedStatement para comunicação
            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql.toString(), connection);

            //Conversão e retorno das informações
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()){
                int quantidadeTotal = rs.getInt("quantidades");
                int quantidadeDefeitos = rs.getInt("defeitos");
                int quantidadeDisponivelVenda = quantidadeTotal - quantidadeDefeitos;

                Map<String,Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("nomeProduto", rs.getObject("nome"));
                map.put("quantidadeTotal", quantidadeTotal);
                map.put("quantidadeDefeitos", quantidadeDefeitos);
                map.put("quantidadeDisponivelVenda", quantidadeDisponivelVenda);
                map.put("preco", rs.getObject("preco"));
                listMap.add(map);
            }
            return listMap;
        } catch (SQLException e) {
            System.out.println("Erro ao consultar produtos: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar produtos no banco de dados.", e.getMessage());
        } finally {
            //Fechamento das conexões
            connection.close();
            preparedStatement.close();
        }
    }

    public Object getProductById(long id) throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            Map<String, Object> mapProduto = new HashMap<>();

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM produtos WHERE id = ?");

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql.toString(), connection);
            preparedStatement.setLong(1, id);

            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()){
                int quantidadeTotal = rs.getInt("quantidades");
                int quantidadeDefeitos = rs.getInt("defeitos");
                int quantidadeDisponivelVenda = quantidadeTotal - quantidadeDefeitos;

                mapProduto.put("id", rs.getObject("id"));
                mapProduto.put("nomeProduto", rs.getObject("nome"));
                mapProduto.put("quantidadeTotal", quantidadeTotal);
                mapProduto.put("quantidadeDefeitos", quantidadeDefeitos);
                mapProduto.put("quantidadeDisponivelVenda", quantidadeDisponivelVenda);
                mapProduto.put("preco", rs.getObject("preco"));
            }
            return mapProduto;
        } catch (SQLException e) {
            throw new SQLException("Erro ao consultar produtos no banco de dados.", e.getMessage());
        } finally {
            connection.close();
            preparedStatement.close();
        }
    }

    public void atualizarQuantidadeProduto(long produtoId, int quantidadeVendida) throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            StringBuilder sqlUpdateProduto = new StringBuilder();
            sqlUpdateProduto.append("UPDATE produtos SET quantidades = quantidades - ? WHERE id = ?");

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sqlUpdateProduto.toString(), connection);
            preparedStatement.setInt(1, quantidadeVendida);
            preparedStatement.setLong(2, produtoId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException("Erro ao atualizar quantidade de produto.", e.getMessage());
        } finally {
            if (connection != null) connection.close();
            if (preparedStatement != null) preparedStatement.close();
        }
    }

    @Transactional
    public void atualizarPrecoEQuantidadeProduto(long id, Map<String, Object> product) throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            Map<String, Object> produto = (Map<String, Object>) this.getProductById(id);

            double precoProdutoAtualizado = (double) product.get("preco");
            BigDecimal precoProdutoAtualBD = (BigDecimal) produto.get("preco");
            double precoProdutoAtual = precoProdutoAtualBD.doubleValue();

            if(precoProdutoAtualizado < precoProdutoAtual)
                throw new IllegalArgumentException("O preço não pode ser reduzido.");

            int novaQuantidadeDefeitos = (int) product.get("quantidadeDefeitos");
            int quantidadeTotal = (int) produto.get("quantidadeDefeitos");

            if(novaQuantidadeDefeitos < 0)
                throw new IllegalArgumentException("A quantidade de produtos com defeitos não " +
                        "pode ser negativa");

            if(novaQuantidadeDefeitos > quantidadeTotal) {
                throw new IllegalArgumentException("A quantidade de produtos com defeitos não " +
                        "pode ser maior que a quantidade total de produtos");
            }

            StringBuilder sqlUpdateProduto = new StringBuilder();
            sqlUpdateProduto.append("UPDATE produtos SET defeitos = ?, preco = ? WHERE id = ?");

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sqlUpdateProduto.toString(), connection);
            preparedStatement.setInt(1, novaQuantidadeDefeitos);
            preparedStatement.setDouble(2, precoProdutoAtualizado);
            preparedStatement.setLong(3, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException("Erro ao atualizar quantidade de produto.", e.getMessage());
        } finally {
            if (connection != null) connection.close();
            if (preparedStatement != null) preparedStatement.close();
        }
    }

    public void insertProduct(Map<String, Object> product) throws SQLException {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append("INSERT INTO produtos (nome, preco) VALUES ('")
                    .append(product.get("name")).append("', ")
                    .append(product.get("preco")).append(")");

            System.out.println("SQL para inserir produto: " + sql);
            nativeScriptService.execute(sql.toString());
        } catch (Exception e) {
            System.out.println("Erro ao inserir produto: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao inserir produto no banco de dados.", e.getMessage());
        }
    }
}
