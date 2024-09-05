import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsCardContainerComponent } from './news-page/news-card-container/news-card-container.component';
import { MoreNewsComponent } from './more-news/more-news.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NewsPageComponent,
    NewsCardComponent,
    NewsDetailComponent,
    NewsCardContainerComponent,
    MoreNewsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
