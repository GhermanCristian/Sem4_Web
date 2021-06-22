import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';

export class User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user: User;

  constructor(private loginService: LoginService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.loginService.login(this.user)
      .subscribe(
        response => {
          if (response["status"] === "valid") {
            this.router.navigate(['/main/albums']);
          }
          else {
            this.router.navigate(['']);
          }
        },
        error => console.log(error));
  }
}
