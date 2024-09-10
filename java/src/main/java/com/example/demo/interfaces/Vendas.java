package com.example.demo.interfaces;

import java.sql.SQLException;
import java.util.Map;

public interface Vendas {

    public void cadastrarVenda(Map<String, Object> sale) throws SQLException;
}
