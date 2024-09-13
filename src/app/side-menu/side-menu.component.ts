import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { routeReuse } from '../utils/newsUtils';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  //Declarando parâmetros de pesquisa
  @Input() searchText:string;

  //Declarando rotas
  moreNewsRoute:string;
  newsDetailRoute:string;
  searchNewsRoute:string;

  //Declarando parâmetros de Header
  detailsParams:{};
  searchParams:{};
  
  //Declarando propriedade de News ID randômica
  randomId:number;

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {

      //Atribuindo primeiro valor a randomId
      this.api.getRndId().subscribe(
        (data)=>{
          this.randomId = data;
          
          //Atribuindo valor a propriedade de parâmetro assincronicamente para esperar randomId ter valor e evitar 'undefined'
          this.detailsParams = { id: this.randomId, sorte: 1};
        }
      )

      //Verificando alteração no router para gerar nova randomId
     this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)).subscribe(
          () => {
          
          //Reatribuindo valor a randomId
          this.api.getRndId().subscribe(
            (data)=>{this.randomId = data;
            this.detailsParams = { id: this.randomId, sorte: 1};})
        }
      );

    this.searchNewsRoute = './'
    this.moreNewsRoute = "/more-news"
    this.newsDetailRoute = "/news-detail"
  }

  searchNewsUpdate(){
    this.searchParams = {searchParams: this.searchText } ;
    console.log('SearchFuncActiv')
  }

  searchNews(){
    routeReuse(this.router,false)
    this.router.navigate([this.searchNewsRoute],{queryParams: this.searchParams})
  }

  reRoute(){
    routeReuse(this.router,false)
  }

}
