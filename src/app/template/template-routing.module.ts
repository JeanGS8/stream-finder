import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePage } from './template.page';
import { HomeComponent } from '../home/home.component';
import { AltaComponent } from '../alta/alta.component';
import { ProcurarComponent } from '../procurar/procurar.component';
import { ListaComponent } from '../lista/lista.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatePage,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'alta',
        component: AltaComponent
      },
      {
        path: 'procurar',
        component: ProcurarComponent
      },
      {
        path: 'lista',
        component: ListaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatePageRoutingModule { }
