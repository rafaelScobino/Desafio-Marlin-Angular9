import { Component, OnInit } from '@angular/core';

//Importando ActivatedRoute para tratar parâmetros do routerLink
import { ActivatedRoute } from '@angular/router';

//importando model 'News'
import { News } from '../models/news.model';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  paramId:number;
  NewsObj:News;

  constructor(private api:ApiService, private route: ActivatedRoute,) { }

  ngOnInit(): void {

     this.route.queryParamMap.subscribe((param)=>{
      this.paramId = +param.get('id');
     })

    this.api.getNewsById(this.paramId).subscribe((data)=>{
      this.NewsObj = data
    })

  }

}
