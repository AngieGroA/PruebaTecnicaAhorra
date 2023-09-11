import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PokemonService } from './services/pokemon.service';



@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent {
  pokemons: any[] = [];
  criterioBusqueda: string = '';
  favoritePokemons: any[] = [];
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;


  constructor(private pokemonService: PokemonService) {
    this.loadFavoritesFromLocalStorage();
  }
  ngOnInit(): void {
    console.log('Inicializa');
    this.initPokemons()

  }


  initPokemons() {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      const pokemonUrls = data.results.map((result: any) => result.url);

      pokemonUrls.forEach((url: string) => {
        this.pokemonService.getPokemonDetails(url).subscribe((pokemon: any) => {

          const pokemonData: any = {
            id: pokemon.id,
            name: pokemon.name,
            abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
            imageUrl: pokemon.sprites.other.home.front_default,
            colors: '',
            evolution: [],
          };


          this.pokemonService.getEspecie(pokemon.id).subscribe((especieData: any) => {
            // console.log("Info especie", especieData.color.name)
            pokemonData.colors = especieData.color.name
            this.pokemonService.getEvolutions(especieData.evolution_chain.url).subscribe((evolutionData) => {
              //console.log("Info evolution",evolutionData.chain.evolves_to)
              const evolutionsPokemons = this.obtenerEvoluciones(evolutionData.chain.evolves_to);
              pokemonData.evolution = evolutionsPokemons;
              // pokemonData.evolution = evolutionsPokemons;
            })
            // console.log('Pokemon Data:', pokemonData);
            this.pokemons.push(pokemonData);
          });
        });
      });
    });
  }


  obtenerEvoluciones(cadenaEvolucion: any): string[] {
    const evoluciones: string[] = [];

    if (cadenaEvolucion && cadenaEvolucion.length > 0) {

      for (const evolucion of cadenaEvolucion) {

        const nombreEvolucion = evolucion.species.name;
        evoluciones.push(nombreEvolucion);

        const evolucionesSubsecuentes = this.obtenerEvoluciones(evolucion.evolves_to);
        evoluciones.push(...evolucionesSubsecuentes);
      }
    }

    return evoluciones;
  }

  filtrarPokemon() {
    const criterio = this.criterioBusqueda.toLowerCase().trim();

    if (criterio === '') {
      this.initPokemons();
    } else {
      this.pokemons = this.pokemons.filter(pokemon => {
        return (
          pokemon.name.toLowerCase().includes(criterio) ||
          pokemon.id.toString().includes(criterio)
        );
      });
    }
  }

  favorite(pokemon: any) {
    if (this.isFavorite(pokemon)) {
      this.pokemonService.removeFromFavorites(pokemon);
    } else {
      this.pokemonService.addToFavorites(pokemon);
    }
  }

  isFavorite(pokemon: any): boolean {
    return this.favoritePokemons.some(fav => fav.id === pokemon.id);
  }

  private loadFavoritesFromLocalStorage(): void {
    this.favoritePokemons = this.pokemonService.getFavorites();
  }

}

