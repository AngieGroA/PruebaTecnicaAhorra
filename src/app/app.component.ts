import { Component } from '@angular/core';
import { PokemonService } from './pokemons/services/pokemon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-tecnica';
  opened = false;
  favoritePokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {
    this.favoritePokemons = this.pokemonService.getFavorites();
  }

  ngOnInit(): void {


  }

  onClick(){
    this.opened = false;
  }

  deleteFavorites(){
    this.pokemonService.deleteFavorites();
    this.favoritePokemons = this.pokemonService.getFavorites();
    window.location.reload();
  }

}
