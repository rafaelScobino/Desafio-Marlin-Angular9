
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
       
        //Validando como Array
        if (Array.isArray(data)){

          //Transformando items em News
          transformedData = data.map((item)=>{return News.createNews(item)});

          validData = transformedData;

        }else{
          throw new Error('Observable is not an Array');        
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
          newsObj = News.createNews(data);
          
            return newsObj;
          
        }else{
          throw new Error('Data return more than one item')
        } 
        
      }))}

  //Método POST para gravar News criada
  postNews(data:News):Observable<News>{

    //Validando input do usuário como News Object
    if( data instanceof News) {

    //Criando POST para envio dados
    return this.http.post<News>('https://jsonplaceholder.typicode.com/posts',data,{ 
    headers:{'Content-type': 'application/json'},
    reportProgress: true
    })
      
    }else{
      throw new Error('POST not executed because Data is not valid News')
    }
  }

  //Método para criar um novo News.ID valido considerando numero de elementos retornados pelo GET
  getValidId():Observable<number>{
    //Definindo Array de items
    let itemsArr:any[];

    //Definindo Array de items.id
    let idArr:number[];

    //Chamando GET all
    return this.http.get<any>(this.ApiUrl).pipe(

      //Tratando Observable
      map((data)=>{
      
        itemsArr =  data;

        //Validando itemsArr como Array
        if(Array.isArray(itemsArr)){
          
          //Logica para retornar um Array de item.id ordenado
          let stringIdArr = data.map((item: { id: any; })=>{ return item.id})
          idArr = stringIdArr.map((item: string) => parseInt(item))
          idArr.sort((a:number, b:number) => a - b)
          
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

  //Método para criar News.ID
  getRndId():Observable<number>{
    //Definindo Array de News
    let newsArr:News[];

    //Definindo Array de News.id
    let idArr:number[];

    //Definindo ID randômico de retorno
    let rndId:number;

    //Chamando GET all
    return this.getAllNews().pipe(

      //Tratando Observable
      map((data)=>{
      
        newsArr =  data;

        //Validando newsArr como Array
        if(Array.isArray(newsArr)){
          
          //Logica para retornar um Array de News.id 
          idArr = data.map((news)=>{ return news.id})
          
          //Validando idArr e definindo o ID randômico
          if(idArr.length > 0 && idArr.length === 1){
            rndId = idArr[0];    
            return rndId;

          }else if(idArr.length > 1){

            //Lógica para gerar o rndID e validar se ele pertence ao idArr
            idArr.sort((a,b) =>  a - b)
            do{
              rndId = Math.floor(Math.random() * (idArr[idArr.length - 1]))
            }while(!idArr.some(element => element === rndId ))

            return rndId;

          }
          
          else{
            throw new Error('idArr is empty');
          }

        }else{
          throw new Error ("couldn't get rndID") 
        }
    }))};

}
