
//Service responsável por lidar com requests GET e POST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //Definindo URL da api e seu escopo
  private ApiUrl = 'https://5cf9ae9df26e8c00146cff8d.mockapi.io/api/v1/post/'

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

          //Retornando items validados como News
          validData = transformedData.filter(News.isValid)
          console.log(validData)
        }else{
          throw new Error('Observable is not a valid News Array');        
        }

        return validData;

      }))}

  //Método GET para retornar uma notícia especifica aceitando como parâmetro id:numero
  getNewsById(id:number):Observable<News>{
  
    //Definindo nova url com ID como parâmetro
    let IdUrl = `${this.ApiUrl}${id}`
    
    //Definindo Object News para return
    let newsObj:News; 

    //Retornando 'Observable" e utilizando pipe para transformar em 'News' e validação
    return this.http.get<any>(IdUrl).pipe(
      map((data)=>{
        
        //Verificando se a request retorna apenas um item
        if(!Array.isArray(data)){
        
          //Transformando resposta em 'News'
          newsObj = News.transformNews(data);
          
          //Validando Objeto
          if(News.isValid(newsObj)){
          
            return newsObj

          }else{
            throw new Error('Data is not a valid News Object')
          }
          
        }else{
          throw new Error('Data return more than one item')
        } 
        
      }))}

  //Método POST para gravar News criada
  postNews(data:News):void{

    //Validando input do usuário como News Object
    if(News.isValid(data)){

    //Criando requisição POST para enviar dados com fetch
    fetch(this.ApiUrl,
      {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
      
      }).then((response)=>{response.json()})
        .then((postResult) => {console.log(postResult)})

    }else{
      throw new Error('POST not executed because Data is not valid News')
    }
  }

  //Método para criar News.ID
  getValidId():Observable<number>{
    //Definindo Array de News
    let newsArr:News[];

    //Definindo Array de News.id
    let idArr:number[];

    //Chamando GET all
    return this.getAllNews().pipe(

      //Tratando Observable
      map((data)=>{
      
        newsArr =  data;

        //Validando newsArr como Array
        if(Array.isArray(newsArr)){
          
          //Logica para retornar um Array de News.id ordenado
          idArr = data.map((news)=>{ return news.id})
          idArr.sort((a:number, b:number) => a - b)
          console.log(idArr)
          
          //Validando idArr e definindo o próximo ID valid
          if(idArr.length > 0){
            let validId:number = idArr[idArr.length - 1] + 1   

            return validId;
          }else{
            throw new Error('idArr is empty');
          }

        }else{
          throw new Error ("couldn't get valid ID") 
        }
    }))};

}
