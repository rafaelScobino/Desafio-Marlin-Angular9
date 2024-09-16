import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Importando funções de apoio do NewsUtils
import { routeReuse } from 'src/app/utils/newsUtils';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit {

  //Declarando propriedades do component
  span:string;
  btnText:string;

  //Declarando propriedades da lógica do component
  @Input('isPosted') isPosted:boolean;
  @Input('postId') postId: string;
  @Input('postTitle') postTitle:string;
  @Input() isValid:boolean;
  @Input() requestOk:boolean;

  //Declarando propriedades de rota
  feedbackRoute:string;
  routeParams:{id:number, title:string};

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.feedbackOpts()
  }

  //Método responsável por definir o texto do feedback
  feedbackOpts(){

    if(this.isValid && this.requestOk){
      this.span = 'Sua Notícia foi enviada com sucesso!';
      this.btnText = 'Ver Detalhes';
      this.feedbackRoute = '/news-detail'
      this.routeParams = {id: parseInt(this.postId), title: this.postTitle}

    }else if(this.isValid){
      this.span = 'Processo de envio falhou, tente novamente.';
      this.btnText = 'Tente Novamente';
      this.feedbackRoute = '/more-news'
      this.routeParams = {id: null , title:null}

    }else{
      this.span = ' Notícia NÃO enviada, informações invalidas:  Titulo e corpo vazios, url da imagem não é "https://"';
      this.btnText = 'Tente Novamente';
      this.feedbackRoute = '/more-news'
      this.routeParams = {id: null , title:null}
    }
  }

  //Método responsável pela navegação  de rota
  goToDetails(){
    
    //Definindo estratégia de rota para impedir o Angular de usar a mesma rota e simular um 'page Refresh'
    routeReuse(this.router,false)
    
    this.router.navigate(
    [this.feedbackRoute],
    { queryParams: this.routeParams })
  }
}
