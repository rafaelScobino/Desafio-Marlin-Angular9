import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

//Importando funções de apoio do NewsUtils
import { routerUrlParams } from '../utils/newsUtils';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //Declarando propriedades do header component
  headerTitle:string;
  headerSubtitle:string;
  headerSubtitleNum:number = 6;
  headerSubtitleSearch:string = '';

  //Declarando propriedades passadas pelo component pai para definir titulo e subtitulo 
  @Input('title') inputTitle:string;
  @Input('subtitle') inputSubtitle: string;

  //Propriedade para NgIf do subtitulo
  showSubtitle:boolean = true;
  showSearch: boolean = false;

  constructor(private route: ActivatedRoute, private router:Router) { }

  
  ngOnInit(): void {

    //Escutando eventos de rota para modificar o component
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      let url = this.router.url;
      let params = routerUrlParams(this.router);

      if(params['title']){
        this.showSubtitle = false;
        this.showSearch = false;
        this.headerTitle = params['title'];

      }else if(params['qty']) {
        this.showSubtitle = true;
        this.showSearch = false;
        this.headerSubtitleNum = params['qty']
        this.headerInputs(url)

      }else if(params['searchParams']){
        this.showSubtitle = true;
        this.showSearch = true;
        this.headerSubtitleSearch  = params['searchParams']
        this.headerInputs(url)

      }else{
        this.showSubtitle = true;
        this.showSearch = false;
        this.headerInputs(url)

      }
    }) 
   }

  //Método responsável por lidar com a lógica da definição do titulo e subtitulo do component
  private headerInputs(url: string): void {

    if (url.includes('/news-detail')) {
      this.headerTitle = 'Estou com sorte!';
      this.headerSubtitle = 'Pagina que te traz notícias aleatórias!';

    } else if (url.includes('/more-news')) {
      this.headerTitle = 'Crie sua Própria Notícia !';
      this.headerSubtitle = 'Preencha o Formulário, Poste e nos envie sua contribuição !';

    } else if (url.includes('searchParams')) {
      this.headerTitle = 'Sua Página de Notícias Feita em Angular 9!';
      this.headerSubtitle = `Aqui estão os resultados para sua busca: `;

    }else{
      this.headerTitle = 'Sua Página de Notícias Feita em Angular 9!';
      this.headerSubtitle = `Encontramos um total de ${this.headerSubtitleNum} resultados para sua busca`;

    }
  }

  
}
   
      
