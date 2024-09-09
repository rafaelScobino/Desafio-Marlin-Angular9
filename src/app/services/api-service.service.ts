
//Service responsável por lidar com requests GET e POST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //Definindo URL da api e seu escopo
  private ApiUrl = 'https://5cf9ae9df26e8c00146cff8d.mockapi.io/api/v1/post'

  //Construindo 'HttpClient' para fazer requests
  constructor( private http: HttpClient ) { }

  //Método GET para retornar um Array de notícias → classe 'News'
  getAllNews():Observable<News[]> {
  
  //Retornando 'Observable' e utilizando o método pipe para transformar a data e validar a classe 
    return this.http.get<any[]>(this.ApiUrl).pipe(
    
    //Validando 'Observable' como um Array de 'News'
      map((data)=>{
      //Definindo variáveis
        let transformedData:any;
        let validData:News[];
        console.log(data)
        
        //Validando como Array
        if (Array.isArray(data)){

          //Transformando items em News
          transformedData = data.map((item)=>{return News.transformNews(item)});
          console.log(transformedData)

          //Retornando items validos como News
          validData = transformedData.filter(News.isValid)
          console.log(validData)
        }else{
          console.log('Observable is not a valid News Array');
          return [];
        }

        return validData;

      }))}


}
