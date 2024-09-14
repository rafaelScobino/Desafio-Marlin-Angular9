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

  testId:number=37;

  //Declarando propriedade para 'post-feedback'
  _isPosted:boolean;

  //Declarando propriedade para WebApi POST
  validId:string;


  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    //Gerando nova ID valida para notícia
    this.api.getValidId().subscribe((data)=>{
      this.validId = `${data}`
      console.log(this.validId)
    })

  }

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

  setPost(isPosted: boolean) {
    this._isPosted = isPosted;
  }
}
