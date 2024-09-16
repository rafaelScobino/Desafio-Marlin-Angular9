//Arquivo utils para funções de apoio

import { Router } from "@angular/router";

//Importando função para transformar data do utils
import { News } from "../models/news.model";

//Função para encurtar texto com finalidade de criar os 'news-card'
export function textToPrev(text:string,index:number):string{

  let preview:string; 
    if(text.length > index){
      preview = text.slice(0,index);

    }else{
     return preview = text;
    }

  return `${preview}...`;
}

//Função para transformar Data em string
export function transformDate(date:string):string{

    let newDate = new Date(date);
      let dia = newDate.toLocaleString('default',{day: 'numeric'});
      let mes = newDate.toLocaleString('default',{month: 'short'});
      let ano = newDate.toLocaleString('default',{year: 'numeric'});
    let cleanDate =  `${dia} ${mes} ${ano}`;

    return cleanDate;
}

//Função para adicionar uma quantidade predefinida de itens de um Array em outro
export function moreItems(forArr:any[],pushArr:any[],num:number):any[]{

  let index:number = pushArr.length;
  let untilNum:number
  
    if(pushArr.length > 0 ){
      untilNum = (pushArr.length - 1) + num;

    }else{
      untilNum = num - 1;
    }

      if(untilNum >= forArr.length - 1){ 
        untilNum = forArr.length - 1;

      }else{};

    for(let i = index; i <= untilNum; i++){
      pushArr.push(forArr[i])
    }

  return pushArr;
}

//Função para verificar se o Array de Objeto 'News' contêm o texto passado como parâmetro 
export function textFilter(newsArr:News[],text:string):News[]{

  let filteredArr = newsArr.filter((news)=>
    news.title.toLowerCase().includes(text) || news.body.toLowerCase().includes(text)
  )

  return filteredArr;   
}

//Função para retornar os QueryParams de uma url
export function routerUrlParams(router:Router):any{
    let url = router.url
    let urlDetails = router.parseUrl(url);
    let queryParams = urlDetails.queryParams;
    return queryParams;
  }


//Método para redefinir a estratégia de reuso do router
export function routeReuse(router:Router,bol:boolean){
  router.routeReuseStrategy.shouldReuseRoute = () => { return bol; };
}

