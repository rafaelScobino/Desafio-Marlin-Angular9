import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  {path: '', component: NewsPageComponent},
  {path:'news-detail', component:NewsDetailComponent},
  {path:'more-news', component:MoreNewsComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }