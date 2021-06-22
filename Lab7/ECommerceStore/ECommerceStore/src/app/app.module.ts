import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AlbumComponent } from './album/album.component';
import { MainAlbumListComponent } from './album/main-album-list/main-album-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {AlbumService} from "./shared/album.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShoppingCartComponent } from './album/shopping-cart/shopping-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginService } from './shared/login.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    MainAlbumListComponent,
    ShoppingCartComponent,
    LoginPageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
  ],
  providers: [AlbumService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
