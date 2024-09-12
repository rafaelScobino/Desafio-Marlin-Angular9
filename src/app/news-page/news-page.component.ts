import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { News } from '../models/news.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

//Injentando ApiService no componente
  constructor(private api:ApiService) { }

  //Declarando array de 'News' e  Objeto 'News'
  newsArr:News[] = []; 
  newsObj:News;
  
  ngOnInit(): void {

    //Retornando Observable<News[]> e definindo valor de newsArr
    this.api.getAllNews().subscribe(
      (obsvNews)=>{
         this.newsArr = obsvNews
      })
  }

}
