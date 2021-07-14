import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { EntryComponent } from './Pages/entry/entry.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { UpdateComponent } from './Pages/update/update.component';
import { AddDataComponent } from './Components/add-data/add-data.component';
import { AddBalanceComponent } from './Components/add-balance/add-balance.component';
import { RegisterBalanceComponent } from './Components/register-balance/register-balance.component';
import { PurchaseOrdersComponent } from './Pages/purchase-orders/purchase-orders.component';
import { SalesOrdersComponent } from './Pages/sales-orders/sales-orders.component';


@NgModule({
  declarations: [
    PerfilComponent,
    SidebarComponent,
    EntryComponent,
    LoadingComponent,
    UpdateComponent,
    AddDataComponent,
    AddBalanceComponent,
    RegisterBalanceComponent,
    PurchaseOrdersComponent,
    SalesOrdersComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
