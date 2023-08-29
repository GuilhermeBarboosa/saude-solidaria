import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService } from 'src/app/shared/notifier.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Logout = 'Logout';

  constructor(private router: Router, private notifier: NotifierService) {}

  ngOnInit() {}

  logout() {
    // this.loginService.logout();
  }
}
