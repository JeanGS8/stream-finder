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
  public movies: any[] = [];
  public account_state: any;

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
    console.log('accountID dentro da lista:', this.accountID);
  }

  //FEITO SOMENTE PRA PEGAR A WATCHLISTA DO INDIVIDUO
  showWatchList() {
    if (this.accountID.length > 0 && this.sessionID.length > 0) {
      this.tmdbAPI.getWatchlist(this.accountID, this.sessionID).subscribe(res => {
        this.movies = [...res.results];

        console.log("Filmes na lista:");
        console.log(this.movies);
      })
    } else {
      console.log("Lista: Usuario não logado");
    }

  }


  showAccountState(){
      this.tmdbAPI.getAccountState(this.movies , this.sessionID).subscribe(res => {
        this.account_state = res;
        console.log(this.account_state);
      })
  }


  addWatchList(media_id: any, watchlistStatus: boolean) {
    // Atualize o estado local imediatamente

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRjMGMwMDVlZjVkYjk3ODI1NWIyNmJiMDg5YTgxMSIsInN1YiI6IjY2MDU4MjZkYWFmZWJkMDE4NzE4MWFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NdJbT1FhwcHbbDRaEFjWa0wPWQragEZGevP64C69JHY'
      },
      body: JSON.stringify({ media_type: 'movie', media_id: media_id, watchlist: watchlistStatus })
    };

    fetch(`https://api.themoviedb.org/3/account/${this.accountID}/watchlist?session_id=${this.sessionID}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        location.reload();
        // A requisição foi bem-sucedida, nenhuma ação adicional necessária.
      })
      .catch(err => {
        console.error(err);

        // Reverter a mudança se houve um erro na requisição
      });
  }


}
