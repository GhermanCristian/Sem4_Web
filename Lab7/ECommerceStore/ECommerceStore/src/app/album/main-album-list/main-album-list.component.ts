import { Component, OnInit } from '@angular/core';
import {Album} from "../shared/album.model";
import {AlbumService} from "../shared/album.service";

@Component({
  selector: 'app-main-album-list',
  templateUrl: './main-album-list.component.html',
  styleUrls: ['./main-album-list.component.css']
})
export class MainAlbumListComponent implements OnInit {
  albums: Album[];
  albumCount: number;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  parseResponse(response) {
    this.albumCount = response[0]['count'];
    response.shift();
    this.albums = response;
  }

  getAlbums() {
    this.albumService.getAlbums()
      .subscribe(
        response => this.parseResponse(response),
        error => console.log(error),
      )
  }

}
