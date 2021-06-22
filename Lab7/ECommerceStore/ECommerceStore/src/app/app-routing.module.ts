import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumComponent} from "./album/album.component";
import { LoginPageComponent } from './login-page/login-page.component';
import {ShoppingCartComponent} from "./album/shopping-cart/shopping-cart.component";
import { MainAlbumListComponent } from './album/main-album-list/main-album-list.component';

const routes: Routes = [
  { path: "", component: LoginPageComponent },
  {
    path: "main", component: AlbumComponent,
    children: [
      { path: "albums", component: MainAlbumListComponent },
      { path: "shoppingCart", component: ShoppingCartComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
