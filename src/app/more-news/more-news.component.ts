import { Component, OnInit, ViewChild} from '@angular/core';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { NewsFormComponent } from './news-form/news-form.component';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit   {

  @ViewChild('newsForm') newsForm!: NewsFormComponent;

  //Declarando propriedade para 'post-feedback'
  _isPosted:boolean;

  //Declarando propriedade para WebApi POST
  validId:string;

  //Declarando propriedade para o link do 'news-card' responsável pela prévia da notícia
  previewLink:string = '/more-news'

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    //Gerando nova ID valida para notícia
    this.api.getValidId().subscribe((data)=>{
      this.validId = `${data}`
      console.log(this.validId)
    })

  }

  //Declarando getters para passar informações do 'news-form' para o 'news-card' da prévia
  get newsTitle() {
    return this.newsForm?.newsTitle || '';
  }

  get newsImgUrl() {
    return this.newsForm?.newsImgUrl || '';
  }

  get newsBody() {
    return this.newsForm?.newsBody || '';
  }

  get isPosted(){
    return this._isPosted
  }

  //Método para receber notificação do forms e ativar o 'post-feedback'
  setPosted(isPosted: boolean) {
    this._isPosted = isPosted;
  }

  //Método para modificar o comportamento do link 'Leia mais' do 'news-card'
  setIsMoreNews(){
    return true
  }

}
