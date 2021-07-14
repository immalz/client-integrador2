import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  user: any = [];
  id: number | any = null;
  hide = true;
  userForm: FormGroup;
  edit: boolean = true;
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private builder: FormBuilder,
    private sidebar: SidebarComponent
  ) {
    this.userForm = this.builder.group({
      nombre: ['', Validators.required],
      correo: [null, Validators.email],
      pass: [null, Validators.required],
      imagen: [null],
    });
   }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
    this.editMode();
  }

  editMode(): any {
    if (this.edit) {
      this.userForm.controls['nombre'].disable();
      this.userForm.controls['correo'].disable();
      this.userForm.controls['pass'].disable();
      this.userForm.controls['imagen'].disable();
    } else {
      this.userForm.controls['nombre'].enable();
      this.userForm.controls['correo'].enable();
      this.userForm.controls['pass'].enable();
      this.userForm.controls['imagen'].enable();
    }
  }

  updateUser(): any {
    this.userService.updateUser(this.userForm.value, this.id).subscribe( 
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.ngOnInit();
        this.edit = true;
        this.editMode();
        this.sidebar.ngOnInit();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getUser(): any {
    this.userService.getUser(this.id).subscribe(
      (res: string) => {
        console.log(res);
        this.user = res;
        this.userForm.patchValue({
          nombre: this.user.nombre,
          correo: this.user.correo,
          pass: this.user.pass,
          imagen: this.user.imagen
        })
      }
    )
  }

}
