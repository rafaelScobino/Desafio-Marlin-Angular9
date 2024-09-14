import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { PostFeedbackComponent } from './more-news/post-feedback/post-feedback.component';
import { AppRoutingModule } from './app-routing.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NewsPageComponent } from './news-page/news-page.component';

//Importando service de requests 
import { ApiService } from './services/api-service.service';

//Importando modulo para configurar dependências do HttpClient
import {HttpClientModule} from '@angular/common/http';
import { NewsFormComponent } from './more-news/news-form/news-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NewsCardComponent,
    NewsDetailComponent,
    MoreNewsComponent,
    PageHeaderComponent,
    NewsPageComponent,
    PostFeedbackComponent,
    NewsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
