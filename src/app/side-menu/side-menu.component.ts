import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  //Declarando rotas
  moreNewsRoute:string;
  newsDetailRoute:string;

  //definindo parâmetro de ID randômica
  detailsParams:{};

  //Definindo propriedade de News ID randômica
  randomId:number;

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {

      //Atribuindo primeiro valor a randomId
      this.api.getRndId().subscribe(
        (data)=>{
          this.randomId = data;

          //Atribuindo valor a propriedade de parâmetro assincronicamente para esperar randomId ter valor e evitar 'undefined'
          this.detailsParams = { id: this.randomId};
        }
      )

      //Verificando alteração no router para gerar nova randomId
     this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)).subscribe(
          () => {
          
          //Reatribuindo valor a randomId
          this.api.getRndId().subscribe(
            (data)=>{this.randomId = data;this.detailsParams = { id: this.randomId};})

        }
      );

    this.moreNewsRoute = "/more-news"
    this.newsDetailRoute = "/news-detail"
  }

  //Método para 


}
