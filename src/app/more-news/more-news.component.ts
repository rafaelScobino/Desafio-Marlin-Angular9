import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

//importando model 'News'
import { News } from '../models/news.model';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit, OnChanges {

  @ViewChild('form', { static: true }) newsFrom: NgForm;

  testeId = 2;

  //Declarando propriedade para 'post-feedback'
  isPosted:boolean;

  //Declarando Objeto do Form
  formObj: {
    createdAt: string;
    title: string;
    image: string;
    body: string;
    id: string;
  }

  //Declarando Objeto News
  NewsObj:News;

  //Declarando propriedades para criação dinâmica de 'news-card'
  @Input() newsImgUrl:string = '';
  @Input() newsTitle:string = '';
  @Input() newsBody:string = '';

  //Declarando propriedade para WebApi POST
  validId:string;
  createdAt:string;

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.newsFrom.form.valueChanges.subscribe(x => {
      console.log(x);
    })
    
    //Gerando nova ID valida para notícia
    this.api.getValidId().subscribe((data)=>{
      this.validId = `${data}`
      console.log(this.validId)
    })

    // 
    this.createdAt = new Date().toISOString()
    console.log(this.createdAt)


  }

  ngOnChanges(changes:SimpleChanges): void {
      this.updateObjNews()
      console.log('objNewsUpdate')
      console.log(this.formObj)
  }

  onSubmit(f: NgForm){
      console.log(f)
      console.log(f.valid)
      console.log(f.valueChanges)
      this.NewsObj = News.createNews(this.formObj)
      console.log(this.NewsObj)
  }


  updateObjNews():void {
    this.formObj  = {
      createdAt:this.createdAt,
      title:this.newsTitle,
      image:this.newsImgUrl,
      body: this.newsBody,
      id: this.validId
    }
  }



  postYourNews(){
  
  this.isPosted = true;
   this.testeId = 3;

  this.NewsObj = News.createNews(this.formObj)

  console.log(this.NewsObj)

    this.api.postNews(
      this.NewsObj
    )
  }

}
