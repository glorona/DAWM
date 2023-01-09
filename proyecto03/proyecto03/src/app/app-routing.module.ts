import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedayComponent } from './componentes/pokeday/pokeday.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PokelistComponent } from './componentes/pokelist/pokelist.component';
import { PokefetchComponent } from './componentes/pokefetch/pokefetch.component';
const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"fetch", component:PokefetchComponent},
  {path:"list",component:PokelistComponent},
  {path:"fetch/:name",component:PokefetchComponent},
  {path:"day",component:PokedayComponent},
  {path:"**",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
