//Arquivo utils para funções de apoio

//Função para encurtar texto com finalidade de criar os news-card
export function textToPrev(text:string,index:number):string{
  let preview:string;

    //Transformando texto para uma string de 'index' characters 
    if(text.length > index){
      preview = text.slice(0,index);
    }else{
     return preview = text;
    }

  return `${preview}...`;
}

//Função para transformar data
export function transformDate(date:string):string{
    let newDate = new Date(date);
      let dia = newDate.toLocaleString('default',{day: 'numeric'});
      let mes = newDate.toLocaleString('default',{month: 'short'});
      let ano = newDate.toLocaleString('default',{year: 'numeric'});
    let cleanDate =  `${dia} ${mes} ${ano}`;

    return cleanDate;
  }


