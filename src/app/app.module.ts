/**
 * 
 * Rain Assessment.
 * Displaying my skills in Angular CRUD operations.
 * Author: Christian N Mdima.
 * Date: 05 Oct 19.
 * 
 * PLEASE NOTE: The given url(https://jsonplaceholder.typicode.com/posts) creates fake entries,
 * data submitted to this endpoint does not get created or updated.
 * 
 * Thank you!
 * 
 **/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostsService } from './services/posts.service';
import { AlertModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ])
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
