import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from './services/tmdb-api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {
  public sessionID: string = '';


  //Sempre pegar informação da conta
  ngOnInit() {
    this.getAccountDetails();
  }
  constructor(private tmdbAPI: TmdbAPIService) {
    this.getSessionIDFromLocalStorage();
  }

  //pra pegar a informação do localStorage
  getSessionIDFromLocalStorage() {
    this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('Session ID from local storage:', this.sessionID);
  }

  //pra pegar a informação da conta
  getAccountDetails() {
    this.tmdbAPI.getAccountInfo(this.sessionID).subscribe(res => {
      console.log(res);
    })
  }
  //logout Simples
  logout() {
    localStorage.removeItem('sessionID');
    window.location.reload();
  }

}
