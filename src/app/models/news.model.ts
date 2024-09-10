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

  //Método para transformar data
  static transformDate(date:string):string{
    let newDate = new Date(date);
      let dia = newDate.toLocaleString('default',{day: 'numeric'});
      let mes = newDate.toLocaleString('default',{month: 'short'});
      let ano = newDate.toLocaleString('default',{year: 'numeric'});
    let newCreatedAt =  `${dia} ${mes} ${ano}`;

    return newCreatedAt;
  }

  //Método para trasnformar ID
  static transformId(id:string):number{
    return  parseInt(id)
  }

  //Método para transformar data em uma string apropriada e o id em number
  static transformNews(item:any): News{
    
    //Transformando createdAt
    let newCreatedAt = News.transformDate(item.createdAt)
    
    //Transformando Id
    let newId = News.transformId(item.id)
    
    //Instanciando classe transformada
    let transformedNews = new News(newCreatedAt,item.title,item.image,item.body,newId)
    
    return transformedNews
  }


}
