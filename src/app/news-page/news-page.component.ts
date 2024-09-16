import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Importando ApiService para request GET
import { ApiService } from '../services/api-service.service';

//Importando model 'News' para formatação de dado
import { News } from '../models/news.model';

//Importando funções de apoio do NewsUtils
import { moreItems, textFilter, routeReuse, routerUrlParams } from '../utils/newsUtils';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  //Declarando array de 'News' e  Objeto 'News'
  loadedNewsArr:News[] = []; 
  newsArr:News[];

  //Declarando quantidade de notícias
  numOfCards:number;

  //Declarando booleano para comportamento do loadMore
  isSearchOn:boolean;

  constructor(private api:ApiService,private router:Router) { }
  
  ngOnInit(): void {
    //Retornando Observable<News[]> e definindo valor de newsArr
    this.api.getAllNews().subscribe(
      (obsvNews)=>{

         this.newsArr = obsvNews;
         if(this.router.url.includes('searchParams')){
          let searchParam = routerUrlParams(this.router)['searchParams'];
            this.loadNews(searchParam)

         }else{
          this.initNews()
          this.setActiveCards()
         }
      })

    //Definindo estratégia de rota para impedir o Angular de usar a mesma rota e simular um 'page Refresh'
    routeReuse(this.router,true)

  }

  //Método para carregar notícias no Array que gera 'news-card'
  initNews():void{
      this.loadedNewsArr = moreItems(this.newsArr,this.loadedNewsArr,6);
      this.setActiveCards()
  }

  //Método para retornar Array filtrado pela pesquisa
  searchedArray(searchString:string):News[]{
    let finalString:string = searchString.toLowerCase()
    return textFilter(this.newsArr,finalString)
  }

  //Método para fazer a lógica de pesquisa e inicialização do component
  loadNews(searchParam:string):void{
        this.isSearchOn = true;
        this.loadedNewsArr = this.searchedArray(searchParam)
  }

  //Método para limpar Array modificado pela pesquisa
  cleanLoadedNews(){
    this.loadedNewsArr = []
  }

  //Método para carregar mais 'news-card'
  loadMore():void{

    if(this.isSearchOn){
      this.cleanLoadedNews()
      this.isSearchOn = false;

    }

    this.loadedNewsArr =  moreItems(this.newsArr,this.loadedNewsArr,6);
    this.setActiveCards()
    this.router.navigate([],{queryParams:{qty:this.numOfCards}});
  }

   //Método para dar update na propriedade 'numOfCards'
  setActiveCards():void{
    this.numOfCards = this.loadedNewsArr.length
  }

}
