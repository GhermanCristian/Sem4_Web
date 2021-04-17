import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AlbumService {
  private allAlbumsURL = "http://localhost/lab8/getAlbums.php";
  private shoppingCartURL = "http://localhost/lab8/getAlbumsFromShoppingCart.php";
  private addToShoppingCartURL = "http://localhost/lab8/addToShoppingCart.php";
  private removeFromShoppingCartURL = "http://localhost/lab8/removeFromShoppingCart.php";

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
      },
      withCredentials: true, // the apache / angular servers are on different ports, so the PHP sessions won't work => we need this
    });
  }

  addAlbumToShoppingCart(albumID, quantity): Observable<number> {
    return this.httpClient.get<number>(this.addToShoppingCartURL, {
      params: {
        "modifiedElementID": albumID,
        "itemCount": quantity
      },
      withCredentials: true,
    });
  }

  removeFromShoppingCart(albumID, removeOne): Observable<any> {
    return this.httpClient.get<any>(this.removeFromShoppingCartURL, {
      params: {
        "modifiedElementID": albumID,
        "removeOne": removeOne
      },
      withCredentials: true,
    });
  }
}
