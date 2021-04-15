import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumComponent} from "./album/album.component";

const routes: Routes = [
  {path: "albums", component: AlbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
