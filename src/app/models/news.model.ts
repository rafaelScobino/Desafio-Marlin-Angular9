//Modelo da classe "News" para tratar requests e padronizar "api-service"
export class News {
  createdAt: string;
  title: string;
  image: string;
  body: string;
  id: number;

  constructor(createdAt: string, title: string, image: string, body: string, id:number) {
    this.createdAt = createdAt;
    this.title = title;
    this.image = image;
    this.body = body;
    this.id = id;
  }

  //Método de validação da classe
  static isValid(data: any): data is News{
    return data && 
        typeof data.createdAt === 'string' &&
        typeof data.title === 'string' &&
        typeof data.body === 'string' &&
        typeof data.id === 'number'; 
  }

  //Método para transformar data em uma string apropriada e o id em number
  static transformNews(newsItem:any): News{
    
    //Transformando createdAt
    let date = new Date(newsItem.createdAt);
      let dia = date.getDay();
      let mes = date.toLocaleString('default',{month: 'short'});
      let ano = date.getFullYear();
    let newCreatedAt =  `${dia} ${mes} ${ano}`
    
    //Transformando Id
    let newId = parseInt(newsItem.id)
    
    //Instanciando classe transformada
    let transformedNews = new News(newCreatedAt,newsItem.title,newsItem.image,newsItem.body,newId)
    
    return transformedNews
  }


}
