import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AlbumService {
  private allAlbumsURL = "http://localhost/lab8/getAlbums.php";
  private shoppingCartURL = "http://localhost/lab8/getAlbumsFromShoppingCart.php";

  constructor(private httpClient: HttpClient) {
  }

  getAlbums(currentPage, albumsPerPage, currentGenre): Observable<any> {
    return this.httpClient.get<any>(this.allAlbumsURL, {
      params: {
        "currentPage": currentPage,
        "elementsPerPage": albumsPerPage,
        "currentGenre": currentGenre
      }
    });
  }

  getAlbumsFromShoppingCart(currentPage, albumsPerPage): Observable<any> {
    return this.httpClient.get<any>(this.shoppingCartURL, {
      params: {
        "currentPage": currentPage,
        "elementsPerPage": albumsPerPage
      }
    })
  }
}
