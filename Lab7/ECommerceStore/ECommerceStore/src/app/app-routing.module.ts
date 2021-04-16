import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumComponent} from "./album/album.component";
import {ShoppingCartComponent} from "./album/shopping-cart/shopping-cart.component";

const routes: Routes = [
  {path: "albums", component: AlbumComponent},
  {path: "albums/shoppingCart", component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
