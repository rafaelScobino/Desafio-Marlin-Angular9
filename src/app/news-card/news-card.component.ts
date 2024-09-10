import { Component, Input, OnInit } from '@angular/core';

//Importando arquivo de utils para acesso a funções de apoio
import {textToPrev} from './../utils/newsUtils';

//Importando ApiService para validar url da imagem
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  //Definindo variáveis para criação dinâmica de news-card.component
  @Input('img') cardImgUrl:string = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

  //Variável do titulo da notícia e tratando o dado para gerar preview
  @Input('title') cardTitle:string = 'Placeholder Title';
  cardTitlePrev:string;

  //Variável do corpo de texto da notícia e tratando o dado para gerar preview
  @Input('body') cardBody:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in';
  cardBodyPrev:string;

  @Input('id') cardId:number;

  //Definindo string para 'routerLink' com cardId como parâmetro
  detailsLink:string;
  detailsParams:{};

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    
    //Inicializando url de router detailsLink e parâmetros
    this.detailsLink = '/news-detail'
    this.detailsParams = { id: this.cardId}

    //Utilizando 'textToPrev' para encurtar o texto do titulo e fazer a preview
    this.cardTitlePrev = textToPrev(this.cardTitle,80);
    
    //Utilizando 'textToPrev' para encurtar o texto do body e fazer a preview
    this.cardBodyPrev = textToPrev(this.cardBody,97);

    console.log(`${this.cardTitle}: id: ${this.cardId}`)

  }

}
