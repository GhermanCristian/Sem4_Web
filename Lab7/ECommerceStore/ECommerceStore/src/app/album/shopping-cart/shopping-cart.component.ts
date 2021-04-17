import { Component, OnInit } from '@angular/core';
import * as constants from "../shared/constants";
import {Album} from "../shared/album.model";
import {AlbumService} from "../shared/album.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  albums: Album[];
  currentPage: any;

  constructor(private albumService: AlbumService) {
    this.currentPage = 1;
    this.albums = []; // when the shopping cart was empty, I would get an error 'albums is undefined', because
    // getAlbumsFromShopping doesn't receive anything
  }

  ngOnInit(): void {
    this.getAlbumsFromShoppingCart();
  }

  getAlbumsFromShoppingCart() {
    this.albumService.getAlbumsFromShoppingCart(this.currentPage, constants.ALBUMS_PER_PAGE)
      .subscribe(
        response => this.albums = response,
        error => console.log(error),
      );
  }

  goBackOnePage() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage -= 1;
    this.getAlbumsFromShoppingCart();
  }

  goForwardOnePage() {
    this.currentPage += 1;
    this.getAlbumsFromShoppingCart();
  }

  private removeFromCart(ID: number, removeOne: boolean) {
    this.albumService.removeFromShoppingCart(ID, removeOne)
      .subscribe(
        response => console.log(response), // it's always gonna be null, but I'm not sure how to remove it
        error => console.log(error),
      );
    this.getAlbumsFromShoppingCart();
  }

  removeOneOccurrenceFromCart(ID: number) {
    this.removeFromCart(ID, true);
  }

  removeAllOccurrencesFromCart(ID: number) {
    this.removeFromCart(ID, false);
  }
}
