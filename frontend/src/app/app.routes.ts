import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'klabteste', loadChildren: () => import("./inicio/inicio.module").then(m => m.InicioModule)},
  {path: '', loadChildren: () => import("./pages/produtos/produtos.module").then(m => m.ProdutosModule)},
  {path: 'relatorioVendas', loadChildren: () => import("./pages/relatorio-vendas/relatorio-vendas.module").then(m => m.RelatorioVendasModule)},
  {path: 'produtos/:id', loadChildren: () => import("./pages/detalhes/detalhes.module").then(m => m.DetalhesModule)},
  {path: 'produtos/edit/:id', loadChildren: () => import("./pages/editar/editar.module").then(m => m.EditarModule)},
  {path: 'produtos/cadastrar', loadChildren: () => import("./pages/cadastrar-produto/cadastrar-produto.module").then(m => m.CadastrarProdutoModule)},

];
