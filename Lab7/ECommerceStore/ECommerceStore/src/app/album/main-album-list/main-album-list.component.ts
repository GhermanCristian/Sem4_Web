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

  constructor(private albumService: AlbumService, private formBuilder: FormBuilder) {
    this.currentPage = 1;
    this.genreForm = this.formBuilder.group({
      genre: ''
    })
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
      )
  }

  goBackOnePage() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage -= 1;
    this.getAlbums();
  }

  goForwardOnePage() {
    if (this.currentPage * constants.ALBUMS_PER_PAGE >= this.albumCount) {
      return;
    }

    this.currentPage += 1;
    this.getAlbums();
  }
}
