import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../login-page/login-page.component";

@Injectable()
export class LoginService {
  private loginURL = "https://localhost:5001/lab10/login";
  private logoutURL = "https://localhost:5001/lab10/logout";

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<string> {
    return this.httpClient.post<string>(this.loginURL, user, {
      withCredentials: true
    });
  }

  logout(): Observable<string> {
    return this.httpClient.get<string>(this.logoutURL, {
      withCredentials: true
    });
  }
}
