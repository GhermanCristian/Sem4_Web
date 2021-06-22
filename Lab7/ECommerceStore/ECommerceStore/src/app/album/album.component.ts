import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  title = 'taraba casete piata marasti';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout().subscribe(
      _ => this.router.navigate(['']),
      error => console.log(error)
    )
  }
}
