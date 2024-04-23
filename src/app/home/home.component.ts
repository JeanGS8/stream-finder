import { Component, OnInit} from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { TmdbAPIService } from '../services/tmdb-api.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent  implements OnInit {
  currentPage = 1;
  totalPages = 20;
  movies: any[] = []; //Armazena o resultado do getPopularMovie
  swiperModules = [IonicSlides];
  actionMovies: any[] = [];
  adventureMovies: any[] = [];
  animationMovies: any[] = [];
  comedyMovies: any[] = [];
  crimeMovies: any[] = [];
  documentaryMovies: any[] = [];
  dramaMovies: any[] = [];
  familyMovies: any[] = [];
  fantasyMovies: any[] = [];
  historyMovies: any[] = [];
  horrorMovies: any[] = [];
  musicMovies: any[] = [];
  mysteryMovies: any[] = [];
  romanceMovies: any[] = [];
  scienceFictionMovies: any[] = [];
  tvMovieMovies: any[] = [];
  thrillerMovies: any[] = [];
  warMovies: any[] = [];
  westernMovies: any[] = [];



  constructor(private tmdbAPI: TmdbAPIService) {
  }

  //Loop
  getRange(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }


  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    if (this.currentPage <= this.totalPages) {
      this.tmdbAPI.getDiscoverMovies(this.currentPage).subscribe(
        (res) => {
          this.movies = [...this.movies, ...res.results];
        this.actionMovies = this.movies.filter((movie) => movie.genre_ids.includes(28));
        this.adventureMovies = this.movies.filter((movie) => movie.genre_ids.includes(12));
        this.animationMovies = this.movies.filter((movie) => movie.genre_ids.includes(16));
        this.comedyMovies = this.movies.filter((movie) => movie.genre_ids.includes(35));
        this.crimeMovies = this.movies.filter((movie) => movie.genre_ids.includes(80));
        this.documentaryMovies = this.movies.filter((movie) => movie.genre_ids.includes(99));
        this.dramaMovies = this.movies.filter((movie) => movie.genre_ids.includes(18));
        this.familyMovies = this.movies.filter((movie) => movie.genre_ids.includes(10751));
        this.fantasyMovies = this.movies.filter((movie) => movie.genre_ids.includes(14));
        this.historyMovies = this.movies.filter((movie) => movie.genre_ids.includes(36));
        this.horrorMovies = this.movies.filter((movie) => movie.genre_ids.includes(27));
        this.musicMovies = this.movies.filter((movie) => movie.genre_ids.includes(10402));
        this.mysteryMovies = this.movies.filter((movie) => movie.genre_ids.includes(9648));
        this.romanceMovies = this.movies.filter((movie) => movie.genre_ids.includes(10749));
        this.scienceFictionMovies = this.movies.filter((movie) => movie.genre_ids.includes(878));
        this.tvMovieMovies = this.movies.filter((movie) => movie.genre_ids.includes(10770));
        this.thrillerMovies = this.movies.filter((movie) => movie.genre_ids.includes(53));
        this.warMovies = this.movies.filter((movie) => movie.genre_ids.includes(10752));
        this.westernMovies = this.movies.filter((movie) => movie.genre_ids.includes(37));                                       
          // Increase currentPage for the next request
          this.currentPage++;
          // Call loadMovies again to fetch the next page (looping)
          this.loadMovies();
        },
      );
    }
  }

}
