import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { DestructuracionJsonComponent } from './destructuracion-json/destructuracion-json.component';


const routes: Routes = [
  {path: 'pokemons' , component: PokemonsComponent},
  {path: 'json', component: DestructuracionJsonComponent},
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
