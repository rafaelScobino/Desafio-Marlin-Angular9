import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //Definindo propriedades do header component
  @Input('title') inputTitle:string;
  @Input('subtitle') inputSubtitle: string;

  headerTitle:string;
  headerSubtitle:string;

  //Propriedade para NgIf
  showSubtitle:boolean = true;

  constructor(private route: ActivatedRoute, private router:Router) { }

  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let paramTitle = this.routerUrlParams();
      console.log(paramTitle) 
      if(paramTitle){
        this.headerTitle = paramTitle;
        this.showSubtitle = false; 
      }else{
        this.showSubtitle = true;
        let url = this.router.url;
        this.headerInputs(url)
        console.log('event fired')
      }
    }) 
   }

  private routerUrlParams():string{
    let urlDetails = this.router.parseUrl(this.router.url);
    let queryParams = urlDetails.queryParams;
    return queryParams['title'];
  }

  private headerInputs(url: string): void {
    console.log('header activated')
    if (url.includes('/news-detail')) {
      this.headerTitle = 'Estou com sorte!';
      this.headerSubtitle = 'Pagina que te traz notícias aleatórias!';
    } else if (url.includes('/more-news')) {
      this.headerTitle = 'Crie sua Própria Notícia !';
      this.headerSubtitle = 'Preencha o Formulário, Poste e nos envie sua contribuição !';
    } else {
      this.headerTitle = 'Sua Página de Notícias Feita em Angular 9!';
      this.headerSubtitle = 'Encontramos um total de 6 resultados para sua busca';
    }
    console.log(this.headerTitle)
    console.log(this.headerSubtitle)
  }
}
   
      
