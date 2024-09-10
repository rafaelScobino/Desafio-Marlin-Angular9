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
