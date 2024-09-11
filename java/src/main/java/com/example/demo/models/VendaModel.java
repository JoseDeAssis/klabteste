package com.example.demo.models;

import com.example.demo.interfaces.Vendas;
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

@Service
public class VendaModel implements Vendas {

    @Autowired
    private NativeScriptService nativeScriptService;

    @Autowired
    private ProdutoModel produtoModel;

    @Override
    public Object getAllSales() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            List<Map<String, Object>> listMap = new ArrayList<>();

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT v.id, v.comprador, v.produto_id, v.quantidades, v.total_venda, p.nome ");
            sql.append("FROM vendas v ");
            sql.append("JOIN produtos p ON v.produto_id = p.id;");

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql.toString(), connection);

            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()){

                Map<String,Object> map = new HashMap<>();
                map.put("vendaId", rs.getObject("id"));
                map.put("nomeComprador", rs.getObject("comprador"));
                map.put("produtoId", rs.getObject("produto_id"));
                map.put("quantidadeComprada", rs.getObject("quantidades"));
                map.put("valorTotal", rs.getObject("total_venda"));
                map.put("nomeProduto", rs.getObject("nome"));

                listMap.add(map);
            }
            return listMap;
        } catch (SQLException e) {
            System.out.println("Erro ao consultar vendas: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar vendas no banco de dados.", e.getMessage());
        } finally {
            //Fechamento das conexões
            connection.close();
            preparedStatement.close();
        }
    }

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
                throw new IllegalArgumentException("Quantidade desejada indisponível");
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
