import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService } from 'src/app/shared/notifier.service';
import { LoginService } from '../../routes/login.service';
import { TokenJwtService } from 'src/app/shared/token-jwt.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Logout = 'Logout';

  jwt: any = null;
  role = localStorage.getItem('role');
  constructor(
    private router: Router,
    private notifier: NotifierService,
    private loginService: LoginService,
    private tokenJwtService: TokenJwtService
  ) {}

  ngOnInit() {
     this.jwt = this.tokenJwtService.getToken();}

  logout() {
    this.loginService.logout();
  }

  login(){
    this.router.navigateByUrl(`login`);
  }
}
