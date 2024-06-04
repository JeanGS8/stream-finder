import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  public accountID: string = '';
  public sessionID: string = '';
  movies: any[] = [];

  constructor(private tmdbAPI: TmdbAPIService) {}

  ngOnInit() {
    this.getSessionIDFromLocalStorage();
    this.getAccountIdFromLocalStorage();
    
  }
  
  ionViewWillEnter() {
    this.showWatchList();
  }

  getSessionIDFromLocalStorage() {
    this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('SessionID dentro da lista:', this.sessionID);
  }
  getAccountIdFromLocalStorage() {
    this.accountID = localStorage.getItem('accountID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('accountID dentro da lista:', this.sessionID);
  }

  //FEITO SOMENTE PRA PEGAR A WATCHLISTA DO INDIVIDUO
  showWatchList() {
    if (this.accountID.length > 0 && this.sessionID.length > 0) {
      this.tmdbAPI.getWatchlist(this.accountID, this.sessionID).subscribe(res => {
        this.movies = [...res.results];
        console.log("Filmes na lista:");
        console.log(this.movies);
      })
    }else{
      console.log("Lista: Usuario não logado");
    }

  }
}
