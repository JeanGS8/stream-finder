import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.component.html',
  styleUrls: ['./procurar.component.scss'],
})
export class ProcurarComponent  implements OnInit {
  public texto: string = "";
  public movies: any = "";

  constructor(private tmdbAPI: TmdbAPIService) {}

  getMovie(){
    this.movies = this.tmdbAPI.getSearchMovies(this.texto, 1).subscribe(res => {
      this.movies = [...res.results];
    });

    console.log(this.movies);
  }
  async ngOnInit() {}

}