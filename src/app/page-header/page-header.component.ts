import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //Definindo propriedades do header component
  headerTitle:string = 'Exibindo resultados de busca por "Covid 19"' ;
  headerSub:string = 'Encontramos um total de 20 resultados para sua busca';

  constructor() { }

  ngOnInit(): void {
  }

}
