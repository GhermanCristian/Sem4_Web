import { Component, OnInit } from '@angular/core';
import {Album} from "../shared/album.model";
import {AlbumService} from "../shared/album.service";
import {FormBuilder} from "@angular/forms";
import * as constants from "../shared/constants";

@Component({
  selector: 'app-main-album-list',
  templateUrl: './main-album-list.component.html',
  styleUrls: ['./main-album-list.component.css']
})
export class MainAlbumListComponent implements OnInit {
  albums: Album[];
  albumCount: number;
  genreForm: any;
  currentPage: any;
  quantities: string[];

  constructor(private albumService: AlbumService, private formBuilder: FormBuilder) {
    this.currentPage = 1;
    this.genreForm = this.formBuilder.group({
      genre: ''
    });
    this.quantities = ['', '', '', ''];
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  getCurrentGenre(): string {
    return this.genreForm.value.genre;
  }

  onKeyUp(): void {
    this.getAlbums();
  }

  addToCart(albumID, posOnPage): void {
    let quantity = 1; // default if no value is provided in the form
    if (this.quantities[posOnPage] !== '') {
      quantity = parseInt(this.quantities[posOnPage]);
    }
    this.albumService.addAlbumToShoppingCart(albumID, quantity)
      .subscribe(
        response => console.log("albums in shopping cart = ", response),
        error => console.log(error)
      );
  }

  parseResponse(response) {
    this.albumCount = response[0]['count'];
    response.shift();
    this.albums = response;
  }

  getAlbums() {
    this.albumService.getAlbums(this.currentPage, constants.ALBUMS_PER_PAGE, this.getCurrentGenre())
      .subscribe(
        response => this.parseResponse(response),
        error => console.log(error),
      );
  }

  clearQuantityForms(): void {
    for (let i = 0; i < constants.ALBUMS_PER_PAGE; i++) {
      this.quantities[i] = "";
    }
  }

  goBackOnePage() {
    if (this.currentPage <= 1) {
      return;
    }

    this.clearQuantityForms();
    this.currentPage -= 1;
    this.getAlbums();
  }

  goForwardOnePage() {
    if (this.currentPage * constants.ALBUMS_PER_PAGE >= this.albumCount) {
      return;
    }

    this.clearQuantityForms();
    this.currentPage += 1;
    this.getAlbums();
  }

  trackByIndex(index: number, object: any) {
    return index;
  }
}
