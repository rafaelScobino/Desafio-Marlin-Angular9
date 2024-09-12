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

  //Método para validar dados antes de criar instância da classe
  static createNews(item:{
    createdAt: string;
    title: string;
    image: string;
    body: string;
    id: string;}): News | null {
    //const inputs = { item.createdAt, item.title, item.image, item.body, item.id };
    if (News.isValid(item)) {

      return new News(
        item.createdAt, 
        item.title, 
        item.image, 
        item.body, 
        parseInt(item.id)
      );

    } else {
      console.error("Invalid News data");
      return null;
    }
  }

  //Método de validação da classe
  static isValid(data: any): data is News{
    return data && 
        typeof data.createdAt === 'string' && data.createdAt.length > 0 &&
        typeof data.title === 'string' && data.title.length > 0 &&
        typeof data.body === 'string' &&
        typeof data.id === 'string' && data.id != '0'; 
  }

}
