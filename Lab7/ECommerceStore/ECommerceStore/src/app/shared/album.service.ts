import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AlbumService {
  private allAlbumsURL = "https://localhost:5001/lab10/getAllAlbums";
  private shoppingCartURL = "https://localhost:5001/lab10/getAlbumsFromShoppingCart";
  private addToShoppingCartURL = "https://localhost:5001/lab10/addToShoppingCart";
  private removeFromShoppingCartURL = "https://localhost:5001/lab10/removeFromShoppingCart";

  constructor(private httpClient: HttpClient) {
  }

  getAlbums(currentPage, albumsPerPage, currentGenre): Observable<any> {
    return this.httpClient.get<any>(this.allAlbumsURL, {
      params: {
        "currentPage": currentPage,
        "elementsPerPage": albumsPerPage,
        "currentGenre": currentGenre
      },
      withCredentials: true,
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
        "albumID": albumID,
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
