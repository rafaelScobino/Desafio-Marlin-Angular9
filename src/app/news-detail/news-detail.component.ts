import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//importando model 'News'
import { News } from '../models/news.model';

//Importando 'ApiService'
import { ApiService } from '../services/api-service.service';

//Importando função para transformar data do utils
import { routeReuse, transformDate } from '../utils/newsUtils';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  //Declarando propriedades para lidar com retorno do GET
  paramId:number;
  NewsObj:News;
  cleanDate:string;

  constructor(private api:ApiService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

      //Recebendo e tratando parâmetros da url
     this.route.queryParamMap.subscribe((param)=>{
      this.paramId = +param.get('id');
     })

    //Invocando GET para gerar Objeto 'news'
    this.api.getNewsById(this.paramId).subscribe((data)=>{
      this.NewsObj = data
      
      //Tratando a 'News.createdAt' para data de detalhes
      this.cleanDate = transformDate(this.NewsObj.createdAt)
    })

    //Definindo estratégia de rota para impedir o Angular de usar a mesma rota e simular um 'page Refresh'
    routeReuse(this.router,false);
  }

}
