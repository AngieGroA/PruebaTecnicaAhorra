import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  public favoritePokemons: any[] = [];

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=0&limit=10`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getEspecie(pokemonId: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
  }

  getEvolutions(url: string): Observable<any> {
    return this.http.get(url);
  }


  // Servicio compartido para pintar info en otras vistas
  getFavorites(): any[] {
    return this.favoritePokemons;
  }

  addToFavorites(pokemon: any): void {
    this.favoritePokemons.push(pokemon);
  }

  removeFromFavorites(pokemon: any): void {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
    }
  }
}
