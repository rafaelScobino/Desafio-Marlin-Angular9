import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  {path:'', component: NewsPageComponent},
  {path:'news-page', component: NewsPageComponent},
  {path:'news-detail', component:NewsDetailComponent},
  {path:'more-news', component:MoreNewsComponent}

];

@NgModule({
  providers:[],
  imports: [
  RouterModule.forRoot(routes,
    //Definindo comportamento de Router para simular 'reload' da rota do componente
    {onSameUrlNavigation: 'reload'}
  )],
  exports: [RouterModule,CommonModule]
})
export class AppRoutingModule { }