import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dadosCadastroVenda } from '../../type/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private httpClient: HttpClient) { }

  cadastrarVenda(dados: dadosCadastroVenda): Observable<{response: string}> {
    return this.httpClient.post<{response: string}>('vendas', dados);
  }
}
