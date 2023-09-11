import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private localStorageKey = 'favoritePokemons';
 // public favoritePokemons: any[] = [];

   // Inicializa favoritePokemons con los datos almacenados en localStorage, si existen.
  favoritePokemons: any[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

  constructor(private http: HttpClient) {
    this.loadFavoritesFromLocalStorage();
   }

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
    this.saveFavoritesToLocalStorage();
  }

  removeFromFavorites(pokemon: any): void {
    const index = this.favoritePokemons.findIndex(fav => fav.id === pokemon.id);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
      this.saveFavoritesToLocalStorage();
    }
  }

  private saveFavoritesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoritePokemons));
  }

  deleteFavorites(): void {
    localStorage.removeItem('favoritePokemons');
    this.favoritePokemons = [];
  }

  private loadFavoritesFromLocalStorage(): void {
    const storedFavorites = localStorage.getItem(this.localStorageKey);
    if (storedFavorites) {
      this.favoritePokemons = JSON.parse(storedFavorites);
    }
  }

}
