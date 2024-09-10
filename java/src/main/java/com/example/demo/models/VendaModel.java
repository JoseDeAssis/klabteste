package com.example.demo.models;

import com.example.demo.interfaces.Vendas;
import com.example.demo.services.NativeScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

@Service
public class VendaModel implements Vendas {

    @Autowired
    private NativeScriptService nativeScriptService;

    @Autowired
    private ProdutoModel produtoModel;

    @Override
    @Transactional
    public void cadastrarVenda(Map<String, Object> sale) throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            Object produtoIdObj = sale.get("produtoId");
            long produtoId = ((Integer) produtoIdObj).longValue();

            int quantidadeComprada = (int) sale.get("quantidadeComprada");
            String nomeComprador = (String) sale.get("nomeComprador");

            Map<String, Object> produto = (Map<String, Object>) produtoModel.getProductById(produtoId);
            if (produto == null || produto.isEmpty()) {
                throw new Error("produto não existe");
            }

            int quantidadeDisponivel = (int) produto.get("quantidadeDisponivelVenda");
            BigDecimal precoProdutoBD = (BigDecimal) produto.get("preco");
            double precoProduto = precoProdutoBD.doubleValue();

            if (quantidadeComprada > quantidadeDisponivel) {
                throw new Error("Quantidade desejada indisponível");
            }

            double precoTotal = quantidadeComprada * precoProduto;

            StringBuilder sqlVenda = new StringBuilder();
            sqlVenda.append("INSERT INTO vendas (comprador, produto_id, quantidades, total_venda) VALUES (?, ?, ?, ?)");

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sqlVenda.toString(), connection);
            preparedStatement.setString(1, nomeComprador);
            preparedStatement.setLong(2, produtoId);
            preparedStatement.setInt(3, quantidadeComprada);
            preparedStatement.setDouble(4, precoTotal);
            preparedStatement.executeUpdate();

            produtoModel.atualizarQuantidadeProduto(produtoId, quantidadeComprada);
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;  // Lançar exceção para acionar o rollback
        } finally {
            if (connection != null) connection.close();
            if (preparedStatement != null) preparedStatement.close();
        }
    }
}
