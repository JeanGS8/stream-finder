import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
register();

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
})

export class DadosComponent implements OnInit {

  public accountID: string = '';
  public sessionID: string = '';

  public account_state: any;

  swiperModules = [IonicSlides];
  stream: any;
  details: any;
  credits: any;
  duracao: any;
  data: any;
  orcamento: any;
  receita: any;
  video: any;
  recomendacao: any;



  constructor(private tmdbAPI: TmdbAPIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dadosInfo();
  }



  formatarHoras(duracao: number) {
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    const horasStr = ('0' + horas).slice(-2);
    const minutosStr = ('0' + minutos).slice(-2);
    return `${horasStr}h ${minutosStr}m`;
  }

  formatarValor(valor: number) {
    const partes = valor.toFixed(2).split('.');
    return (valor > 0) ? "US$ " + partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + partes[1] : "Valor não informado";
  }




  //Adicionar e remover da watchlist
addWatchList(media_id: any, watchlistStatus: boolean) {
  // Atualize o estado local imediatamente
  const previousState = this.account_state.watchlist;
  this.account_state.watchlist = watchlistStatus;

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

      // A requisição foi bem-sucedida, nenhuma ação adicional necessária.
    })
    .catch(err => {
      console.error(err);

      // Reverter a mudança se houve um erro na requisição
      this.account_state.watchlist = previousState;
    });
}





  dadosInfo() {
    this.route.params.subscribe(params => {

    this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('SessionID dentro do dados:', this.sessionID);
    this.accountID = localStorage.getItem('accountID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('accountID dentro do dados:', this.accountID);

      const movieId = params['id'];
      //recomendacao
      this.tmdbAPI.getRecomendacao(movieId).subscribe(res => {
        this.recomendacao = res.results;
        console.log("recomendacao: ");
        console.log(res);
      })

      this.tmdbAPI.getAccountState(movieId, this.sessionID).subscribe(res => {
        this.account_state = res;
        console.log(this.account_state);

      })


      //nome dos atores
      this.tmdbAPI.getCredits(movieId).subscribe(res => {
        this.credits = res;
        console.log("credits: ");
        console.log(res);
      })

      //dados dos filmes
      this.tmdbAPI.getDetails(movieId).subscribe(res => {
        this.details = res;
        console.log("Details: ");
        console.log(res);

        this.data = this.details?.release_date.replace(/-/g, '/');
        this.duracao = this.formatarHoras(this.details?.runtime);
        this.orcamento = this.formatarValor(this.details?.budget);
        this.receita = this.formatarValor(this.details?.revenue);
      })

      //trailer do filme
      this.tmdbAPI.getVideo(movieId).subscribe(res => {

        if (res.results[0] != undefined) {
          console.log("true");
          this.video = res?.results[0].key;
        }

      });


      // onde assistir
      this.tmdbAPI.getProviders(movieId).subscribe(res => {
        this.stream = res.results;
        console.log("STREAM");
        console.log(res.results);
      });
    })
  }
}
