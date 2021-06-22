import { Component, OnInit } from '@angular/core';
import * as constants from "../../shared/constants";
import {Album} from "../../shared/album.model";
import { AlbumService } from "../../shared/album.service";
import { Router } from '@angular/router';

class AlbumInShoppingCart {
  currentAlbum: Album;
  TimesInCart: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  albums: AlbumInShoppingCart[];
  currentPage: any;

  constructor(private albumService: AlbumService, private router: Router) {
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
        response => {
          if (response[0] === "invalid") {
            this.router.navigate(['']);
            return;
          }
          this.albums.length = 0; // clear the array
          response.forEach(album => this.albums.push(JSON.parse(album)));
        },
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
    // TO-DO: check that we don't go over the no. of elements in the shopping cart
    this.currentPage += 1;
    this.getAlbumsFromShoppingCart();
  }

  private removeFromCart(ID: number, removeOne: boolean) {
    if (confirm("Are you sure ? Cannot be undone! forta cfr campionii")) {
      this.albumService.removeFromShoppingCart(ID, removeOne)
        .subscribe(
          response => console.log(response), // it's always gonna be null, but I'm not sure how to remove it
          error => console.log(error),
        );
      this.getAlbumsFromShoppingCart();
    }
  }

  removeOneOccurrenceFromCart(ID: number) {
    this.removeFromCart(ID, true);
  }

  removeAllOccurrencesFromCart(ID: number) {
    this.removeFromCart(ID, false);
  }
}
