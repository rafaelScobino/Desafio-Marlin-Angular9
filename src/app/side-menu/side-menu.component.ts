import { Component, Input,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';

//Importando função para transformar data do utils
import { routeReuse } from '../utils/newsUtils';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  //Declarando parâmetros de pesquisa
  @Input() searchText:string;

  //Declarando place holder
  searchPlaceHolder:string = 'Pesquisar por...';

  //Declarando rotas
  moreNewsRoute:string;
  newsDetailRoute:string;
  searchNewsRoute:string;

  //Declarando parâmetros de Query
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
          
          //Atribuindo valor a propriedade de parâmetro assincronamente para esperar randomId ter valor e evitar 'undefined'
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

    //Inicializando valores de rotas
    this.searchNewsRoute = './'
    this.moreNewsRoute = "/more-news"
    this.newsDetailRoute = "/news-detail"
  }

  //Método para atualizar parâmetros de busca
  searchNewsUpdate(){
    this.searchParams = {searchParams: this.searchText } ;
  }

  //Método responsável por executar a busca
  searchNews(){
    if(this.searchText){
      routeReuse(this.router,false)
      this.router.navigate([this.searchNewsRoute],{queryParams: this.searchParams})
      
    }else{
      this.searchPlaceHolder = 'Texto inválido'
      setInterval(()=>{this.searchPlaceHolder = 'Pesquisar por...'},3000)
    
    }
    this.searchText = ''
    
  }

  //Método responsável por definir estratégia de rota para impedir o Angular de usar a mesma rota e simular um 'page Refresh'
  reRoute(){
    routeReuse(this.router,false)
  }

}
