import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AlbumService {
  private URL = "http://localhost/lab8/getAlbums.php";

  constructor(private httpClient: HttpClient) {
  }

  getAlbums(currentPage, albumsPerPage, currentGenre): Observable<any> {
    return this.httpClient.get<any>(this.URL, {
      params: {
        "currentPage": currentPage,
        "elementsPerPage": albumsPerPage,
        "currentGenre": currentGenre
      }
    });
  }
}
