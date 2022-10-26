import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteDeleteComponent } from './components/client/client-delete/client-delete.component';
import { ClienteCreateComponent } from './components/client/client-create/client-create.component';
import { ClienteUpdateComponent } from './components/client/client-update/client-update.component';
import { ClienteListComponent } from './components/client/client-list/client-list.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate:[AuthGuard], children: [
      { path: 'home',                               component: HomeComponent },
      { path: 'tecnicos',                     component: TecnicoListComponent},
      { path: 'tecnicos/create',            component: TecnicoCreateComponent},
      { path: 'tecnicos/update/:id',        component: TecnicoUpdateComponent},
      { path: 'tecnicos/delete/:id',        component: TecnicoDeleteComponent},

      { path: 'clientes',                     component: ClienteListComponent},
      { path: 'clientes/create',            component: ClienteCreateComponent},
      { path: 'clientes/update/:id',        component: ClienteUpdateComponent},
      { path: 'clientes/delete/:id',        component: ClienteDeleteComponent},

      { path: 'chamados',                     component: ChamadoListComponent},
      { path: 'chamados/create',            component: ChamadoCreateComponent},
      { path: 'chamados/update/:id',        component: ChamadoUpdateComponent},
      { path: 'chamados/read/:id',          component: ChamadoUpdateComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
