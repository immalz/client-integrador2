import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.formRegister = this.builder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public signUp(): void {
    this.authService.signUp(this.formRegister.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res['message']) {
          this._snackBar.open(res['message'], 'cerrar');
        } else {
          this._snackBar.open(res['successfull'], 'cerrar');
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/acceder']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
