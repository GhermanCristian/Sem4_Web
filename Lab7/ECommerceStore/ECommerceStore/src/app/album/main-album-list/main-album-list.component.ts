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

  constructor(private albumService: AlbumService, private formBuilder: FormBuilder) {
    this.genreForm = this.formBuilder.group({
      genre: ''
    })
  }

  ngOnInit(): void {
    this.getAlbums(1, constants.ALBUMS_PER_PAGE, "");
  }

  onSubmit(): void {
    this.getAlbums(1, constants.ALBUMS_PER_PAGE, this.genreForm.value.genre);
  }

  parseResponse(response) {
    this.albumCount = response[0]['count'];
    response.shift();
    this.albums = response;
  }

  getAlbums(currentPage, albumsPerPage, currentGenre) {
    this.albumService.getAlbums(currentPage, albumsPerPage, currentGenre)
      .subscribe(
        response => this.parseResponse(response),
        error => console.log(error),
      )
  }

}
