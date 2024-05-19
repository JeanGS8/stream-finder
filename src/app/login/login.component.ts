import { Component } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  requestToken: string = '';
  sessionID: string = '';
  showError: boolean = false;


  constructor(private tmdbAPI: TmdbAPIService) {}

  createRequestToken() {
    this.tmdbAPI.getRequestToken().subscribe(res => {
      this.requestToken = res.request_token;
      this.validateRequestToken();
    });
  }

  validateRequestToken() {
    this.tmdbAPI.validateRequestToken(this.username, this.password, this.requestToken).subscribe(res => {
      this.getSessionID();
    }, error => { //Verifica o status do erro, se haver error, ele seta o showError como true
      if (error.status === 400 || error.status === 401) {
        this.showError = true;
        console.log('errrooooorrr');
      }
    });
  }

  //Pega a sessão depois da validação do token, e quando é pego a sessão, quer dizer que foi logado com sucesso
  getSessionID() {
    this.tmdbAPI.getSessionID(this.requestToken).subscribe(res => {
      this.sessionID = res.session_id;
      console.log('session id: ' + this.sessionID);
      localStorage.setItem('sessionID', this.sessionID);
      window.location.href = '/home';
    })
  }
}
