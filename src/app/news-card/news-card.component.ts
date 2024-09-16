import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

//Importando funções de apoio do NewsUtils
import {routeReuse, textToPrev} from './../utils/newsUtils';

//Importando ApiService para validar url da imagem
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit,OnChanges {

  //Declarando propriedades para criação dinâmica de 'news-card'
  @Input('img') cardImgUrl:string = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  @Input('title') cardTitle:string = 'Placeholder Title';
  @Input('body') cardBody:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in';
  @Input('id') cardId:number;
  
  //Declarando propriedades para gerar a prévia
  cardTitlePrev:string;
  cardBodyPrev:string;


  //Declarando url de rota e parâmetro
  detailsLink:string;
  detailsParams:{};

  //Declarando booleano para modificar o comportamento do 'Ler mais'
  @Input() isMoreNews:boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
    
    //Inicializando url de router detailsLink e parâmetros
    this.detailsLink = '/news-detail'
    this.detailsParams = { id: this.cardId, title: this.cardTitle} 
  
    //Utilizando 'textToPrev' para encurtar o texto do titulo e fazer a prévia
    this.cardTitlePrev = textToPrev(this.cardTitle,80);
    
    //Utilizando 'textToPrev' para encurtar o texto do body e fazer a prévia
    this.cardBodyPrev = textToPrev(this.cardBody,97);
  }

  //Utilizando 'ngOnChanges' para modificar a prévia e parâmetro dinamicamente
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['cardTitle'] || changes['cardBody']) {
      this.cardTitlePrev = textToPrev(this.cardTitle, 80);
      this.cardBodyPrev = textToPrev(this.cardBody, 97);
      this.detailsParams = { id: this.cardId, title: this.cardTitle}

    }
    if (changes['cardId']) {
      this.detailsParams = { id: this.cardId, title: this.cardTitle };

    }
  }

  //Método responsável pela navegação do 'Ler mais'
  cardDetails(){
    
    if(this.isMoreNews){
      this.router.navigate(['/more-news'],)

    }else{
      routeReuse(this.router,false)
      this.router.navigate(
        [this.detailsLink],
        { queryParams: this.detailsParams })
    }
  }


}