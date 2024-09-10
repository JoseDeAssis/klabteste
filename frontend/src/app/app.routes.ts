import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'klabteste', loadChildren: () => import("./inicio/inicio.module").then(m => m.InicioModule)},
  {path: '', loadChildren: () => import("./pages/produtos/produtos.module").then(m => m.ProdutosModule)},
  {path: 'produtos/:id', loadChildren: () => import("./pages/detalhes/detalhes.module").then(m => m.DetalhesModule)},
  {path: 'produtos/edit/:id', loadChildren: () => import("./pages/detalhes/detalhes.module").then(m => m.DetalhesModule)}
];
