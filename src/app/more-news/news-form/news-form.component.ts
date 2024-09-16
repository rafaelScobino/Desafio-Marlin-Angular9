import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

//Importando model 'News' para formatação de dado
import { News } from 'src/app/models/news.model';

//Importando ApiService para request POST
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {

  //Declarando propriedades do component
  newsCreatedAt:string;
  newsTitle:string;
  newsImgUrl:string;
  newsBody:string;
  @Input('id') newsId:string;

  //Declarando Objeto 'News'
  NewsObj:News;

  //Declarando Objeto do Form para formar nova notícia
  formObj: {
    createdAt: string;
    title: string;
    image: string;
    body: string;
    id: string;
  }

  //Declarando booleanos para lógica do formulário
  isValid:boolean;
  requestOk:boolean;

  //Declarando 'EventEmitter' para passar informação para o component pai 'more-news'
  @Output() formEvent = new EventEmitter<any>();

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    //Atribuindo valor a propriedade 'createdAt'
    this.newsCreatedAt = new Date().toISOString()
  }


  //Método para checar validade do formulário e acionar o POST
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

  //Método para emitir o booleano de notícia postada para o component pai 'more-news'
  formEmit(value:boolean) {
    this.formEvent.emit(value);
  }

  //Método para atribuir valores ao 'formObj'
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
