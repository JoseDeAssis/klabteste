package com.example.demo.webservices;

import com.example.demo.interfaces.Vendas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/vendas")
public class VendasWs {

    @Autowired
    private Vendas vendas;

    @GetMapping
    public ResponseEntity<Object> getAllSales() {
        try {
            return ResponseEntity.ok(vendas.getAllSales());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Object> registerSale(@RequestBody Map<String, Object> sale) {
        try {
            vendas.cadastrarVenda(sale);
            Map<String, String> response = new HashMap<>();
            response.put("response", "Venda realizada com sucesso!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deu erro");
        }
    }
}
