import { Component } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  errorMsg: string = '';
  showError: boolean = false;
  
  
  constructor(
    private tmdbAPI: TmdbAPIService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
    ) {}

  async createRequestToken() {
    if (!this.username && !this.password) {
      this.showError = true;
      this.errorMsg = 'Por favor, insira seus dados.';
      return;
    }
    else if(!this.username){
      this.showError = true;
      this.errorMsg = 'Por favor, insira um nome de usuário.';
      return;
    }
    else if(!this.password){
      this.showError = true;
      this.errorMsg = 'Por favor, insira sua senha.';
      return;
    }

    try {
      const userCredential = await this.afAuth.signInAnonymously();
      const user = userCredential.user;
      await user?.updateProfile({ displayName: this.username });
      this.firestore.collection('users').doc(user?.uid).set({username: this.username});
      console.log('Autenticado anonimamente com Firebase');

      this.tmdbAPI.getRequestToken().subscribe(res => {
        this.requestToken = res.request_token;
        this.validateRequestToken();
      })
    }
    catch (error) {
      this.showError = true;
      this.errorMsg = 'Erro na autenticação com Firebase';
    }

  }

  validateRequestToken() {
    this.tmdbAPI.validateRequestToken(this.username, this.password, this.requestToken).subscribe(res => {
      this.getSessionID();
    }, error => { //Verifica o status do erro, se haver error, ele seta o showError como true
      if (error.status === 400 || error.status === 401) {
        this.showError = true;
        this.errorMsg = 'Usuário ou senha incorretos.';
      }
    });
  }

  //Pega a sessão depois da validação do token, e quando é pego a sessão, quer dizer que foi logado com sucesso
  getSessionID() {
    this.tmdbAPI.getSessionID(this.requestToken).subscribe(res => {
      this.sessionID = res.session_id;
      console.log('session id: ' + this.sessionID);
      localStorage.setItem('sessionID', this.sessionID);
      this.showError = false;
      window.location.href = '/home';
    })
  }  
}
