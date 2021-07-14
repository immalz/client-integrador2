import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './Pages/perfil/perfil.component';
import { UpdateComponent } from './Pages/update/update.component';
import { EntryComponent } from './Pages/entry/entry.component';
import { PurchaseOrdersComponent } from './Pages/purchase-orders/purchase-orders.component';
import { SalesOrdersComponent } from './Pages/sales-orders/sales-orders.component';

const routes: Routes = [
  { 
    path: 'perfil',
    component: PerfilComponent,
    children: [
      {path: '', component: EntryComponent},
      {path: 'actualizar-datos', component: UpdateComponent},
      {path: 'ordenes-de-compra', component: PurchaseOrdersComponent},
      {path: 'ordenes-de-venta', component: SalesOrdersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
