import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { NewsCardContainerComponent } from './news-card-container/news-card-container.component';

const routes: Routes = [
  {path: '', component: NewsCardContainerComponent},
  {path:'news-detail', component:NewsDetailComponent},
  {path:'more-news', component:MoreNewsComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }