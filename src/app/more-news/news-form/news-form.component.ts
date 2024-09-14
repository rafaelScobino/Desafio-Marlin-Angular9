import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { News } from 'src/app/models/news.model';

import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {

  //Declarando propriedades
  newsCreatedAt:string;
  newsTitle:string;
  newsImgUrl:string;
  newsBody:string;
  @Input('id') newsId:string;

  //Declarando Objeto News
  NewsObj:News;

  //Declarando Objeto do Form
  formObj: {
    createdAt: string;
    title: string;
    image: string;
    body: string;
    id: string;
  }

  isValid:boolean;
  requestOk:boolean;

  @Output() formEvent = new EventEmitter<any>();

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    //Atribuindo valor a propriedade
    this.newsCreatedAt = new Date().toISOString()
    console.log(this.newsCreatedAt)

  }

  submitNews(f:NgForm){

    if(f.valid){
      this.updateObjNews(),
      this.NewsObj = News.createNews(this.formObj)
      this.api.postNews(this.NewsObj).subscribe({
        next: (response: News) => {
          this.requestOk = true;
          this.isValid = true;
          console.log('POST succeeded:', response);
          this.formEmit(true);
        },
        error:(error: any) => {
        console.error('POST failed:', error);
        this.requestOk = false;
        this.isValid = true;
        this.formEmit(true);
        }
      })
    }else{
    this.isValid = false;
    this.formEmit(true);
    }
  }

  //Método para emitir para o "parent component" o booleano de notícia postada 
  formEmit(value:boolean) {
    this.formEvent.emit(value);
  }

  updateObjNews():void {
    this.formObj  = {
      createdAt:this.newsCreatedAt,
      title:this.newsTitle,
      image:this.newsImgUrl,
      body: this.newsBody,
      id: this.newsId
    }
  }

}
