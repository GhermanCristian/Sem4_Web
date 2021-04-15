import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "./album.model";

@Injectable()
export class AlbumService {
  private URL = "http://localhost/lab8/getAlbums.php";

  constructor(private httpClient: HttpClient) {
  }

  getAlbums(): Observable<any> {
    return this.httpClient.get<any>(this.URL);
  }
}
