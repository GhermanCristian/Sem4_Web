import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AlbumComponent } from './album/album.component';
import { MainAlbumListComponent } from './album/main-album-list/main-album-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {AlbumService} from "./album/shared/album.service";

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    MainAlbumListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
