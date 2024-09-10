import { Component, Input, OnInit } from '@angular/core';

//importando model 'News'
import { News } from '../models/news.model';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit {

  NewsObj:News;

  //Definindo propriedades para criação dinâmica de 'news-card'
  @Input() formImgUrl:string;
  @Input() formTitle:string = '';
  @Input() formBody:string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
