import { Component, OnInit } from '@angular/core';
import { TokenJwtService } from '../../shared/token-jwt.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/routes/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Logout = 'Logout';

  jwt: any = null;
  role = localStorage.getItem('role');
  constructor(
    private router: Router,
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
