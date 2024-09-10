import { Component, Input, OnInit } from '@angular/core';

//importando model 'News'
import { News } from '../models/news.model';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit {

  //Declarando Objeto News
  NewsObj:News;

  //Declarando propriedades para criação dinâmica de 'news-card'
  @Input() formImgUrl:string;
  @Input() formTitle:string = '';
  @Input() formBody:string = '';

  //Declarando propriedade para WebApi POST
  validId:number;
  createdAt:string;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getValidId().subscribe((data)=>{this.validId = data
      console.log(this.validId)
    })

    this.createdAt = new Date().toISOString()
    console.log(this.createdAt)

  }

  postYourNews(){
  
  this.NewsObj = new News(
    this.createdAt,
    this.formTitle,
    this.formImgUrl,
    this.formBody,
    this.validId
  )

  console.log(this.NewsObj)

    this.api.postNews(
      this.NewsObj
    )
  }

}
