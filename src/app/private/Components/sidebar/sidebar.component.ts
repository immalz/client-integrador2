import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/public/Components/navbar/navbar.component';
import { AuthService } from 'src/app/public/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  id: any;
  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private navbar: NavbarComponent
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
  }

  getUser(): any {
    this.userService.getUser(this.id).subscribe(
      (res: string) => {
        this.user = res;
      }
    )
  }

  goHome(): any {
    this.navbar.ngOnInit();
    this.router.navigate(['/']);
  }

  exit(): void {
    this.authService.loggout();
  }

}
