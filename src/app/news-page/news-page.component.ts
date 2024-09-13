import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { News } from '../models/news.model';
import { moreItems, newsSearchFilter, routeReuse, routerUrlParams } from '../utils/newsUtils';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

//Injentando ApiService no componente
  constructor(private api:ApiService,private router:Router) { }

  //Declarando array de 'News' e  Objeto 'News'
  loadedNewsArr:News[] = []; 
  newsArr:News[];

  //Declarando quantidade de notícias
  numOfCards:number;

  //Declarando booleano para comportamento do loadMore
  isSearchOn:boolean;
  
  ngOnInit(): void {
    console.log('newspage Ignited')
    //Retornando Observable<News[]> e definindo valor de newsArr
    this.api.getAllNews().subscribe(
      (obsvNews)=>{
         this.newsArr = obsvNews;
         console.log(this.newsArr)
         if(this.router.url.includes('searchParams')){
          let searchParam = routerUrlParams(this.router)['searchParams'];
            this.loadNews(searchParam)
         }else{
          this.initNews()
          this.setActiveCards()
         }
      }
    )
    routeReuse(this.router,true)
  }

  //Método para carregar notícias no array que gera news-card
  initNews():void{
      console.log('init news')
      this.loadedNewsArr = moreItems(this.newsArr,this.loadedNewsArr,6);
      this.setActiveCards()
  }

  //Método para retornar Array filtrado pela pesquisa
  searchedArray(searchString:string):News[]{
    console.log('searched')
    let finalString:string = searchString.toLowerCase()
    return newsSearchFilter(this.newsArr,finalString)
  }

  //Método para fazer a lógica de pesquisa e inicialização do component
  loadNews(searchParam:string):void{
      console.log('loadNews')
        this.isSearchOn = true;
        this.loadedNewsArr = this.searchedArray(searchParam)
        
  }

  cleanLoadedNews(){
    this.loadedNewsArr = []
  }

  //Método para carregar mais news-card
  loadMore():void{
    if(this.isSearchOn){
      this.cleanLoadedNews()
      this.isSearchOn = false;
    }
    console.log('loadMore')
    this.loadedNewsArr =  moreItems(this.newsArr,this.loadedNewsArr,6);
    this.setActiveCards()
    this.router.navigate([],{queryParams:{qty:this.numOfCards}});
  }

   //Método para dar update na propriedade 'numOfCards'
  setActiveCards():void{
    this.numOfCards = this.loadedNewsArr.length
    console.log(this.numOfCards)
  }

}
