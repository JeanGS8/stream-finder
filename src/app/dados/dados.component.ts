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

export class DadosComponent  implements OnInit {

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

  formatarHoras(duracao: number){
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
  
    const horasStr = ('0' + horas).slice(-2);
    const minutosStr = ('0' + minutos).slice(-2);
    return `${horasStr}h ${minutosStr}m`;
  }

  formatarValor(valor: number){
    const partes = valor.toFixed(2).split('.');
    return (valor > 0)? "US$ " + partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + partes[1]: "Valor não informado";
  }

 ngOnInit() {
   this.dadosInfo();
  }
  dadosInfo(){
    this.route.params.subscribe(params => {

      const movieId = params ['id'];
      //recomendacao
      this.tmdbAPI.getRecomendacao(movieId).subscribe(res => {
        this.recomendacao = res.results;
        console.log("recomendacao: ");
        console.log(res);
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

        if(res.results[0] != undefined){
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
