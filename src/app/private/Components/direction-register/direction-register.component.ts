import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-direction-register',
  templateUrl: './direction-register.component.html',
  styleUrls: ['./direction-register.component.css']
})
export class DirectionRegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DirectionRegisterComponent>,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      direction: ['', Validators.required],
      reference: ['', Validators.required],
      phone: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close({data: this.form.value});
  }

}
