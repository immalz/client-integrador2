import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  logged: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');

    console.log(this.user);

    this.user !== null ? this.logged = true : this.logged = false;

  }

  loggout(): any {
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

}
