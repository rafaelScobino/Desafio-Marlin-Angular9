import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeReuse } from 'src/app/utils/newsUtils';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit {

  @Input('isPosted') isPosted:boolean;
  @Input('postId') postId: string;
  @Input('postTitle') postTitle:string;
  @Input() isValid:boolean;
  @Input() requestOk:boolean;

  span:string;
  btnText:string;

  feedbackRoute:string;
  routeParams:{id:number, title:string};

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.postId)
    console.log(this.postTitle)
    this.feedbackOpts()
  }

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
      this.span = ' Notícia NÃO enviada, informações invalidas!';
      this.btnText = 'Tente Novamente';
      this.feedbackRoute = '/more-news'
      this.routeParams = {id: null , title:null}
    }



  }

  goToDetails(){
    routeReuse(this.router,false)
    this.router.navigate(
    [this.feedbackRoute],
    { queryParams: this.routeParams })
  }

}
