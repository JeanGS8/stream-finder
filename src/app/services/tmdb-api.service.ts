import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface apiResult{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}


@Injectable({
  providedIn: 'root'
})
export class TmdbAPIService {

  private bearer: string = environment.tmdbBearer;
  private key: string = environment.tmdbKey;

  constructor(private http: HttpClient) { }

  getSearchMovies(name: string, page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }

  getProviders(id: string): Observable<any> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getDetails(id: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/${id}?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getCredits(id: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getVideo(id: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getRecomendacao(id: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getPopularMovies(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }

  getDiscoverMovies(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }
  getPagesData(): Observable<any> {
    const page1$ = this.getDiscoverMovies(1);
    const page2$ = this.getDiscoverMovies(2);
    const page3$ = this.getDiscoverMovies(3);

    return forkJoin<any>([page1$, page2$, page3$]).pipe(
      map(results => {
        // Aqui você pode manipular os resultados, se necessário
        return results;
      })
    );
  }
    //Relacionado ao login: Pede um token
    getRequestToken(): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.key}`);
    }

    //valida o token e chama a sessão aq
    validateRequestToken(username: string, password: string, requestToken: string): Observable<any> {
      return this.http.post<any>(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.key}`, {
        username,
        password,
        request_token: requestToken
      });
    }
    //chama a sessão
    getSessionID(requestToken: string): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.key}&request_token=${requestToken}`);
    }

    //pega a informação da conta(importante pegar a sessão)
    getAccountInfo(sessionToken: String): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/account?api_key=${this.key}&session_id=${sessionToken}`);
    }
    //Pegar se um filme está na watchlist
    getAccountState(movieID?: any, sessionToken?: String): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieID}/account_states?api_key=${this.key}&session_id=${sessionToken}  `);
    }

    getWatchlist(accountId: string, sessionId: string): Observable<apiResult> {
      return this.http.get<apiResult>(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${this.key}&language=pt-BR&page=1&sort_by=created_at.asc&session_id=${sessionId}`,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.key}`})
        }
      );
  }
}
