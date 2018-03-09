import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  register;
  fields;

  constructor(private httpService: HttpService) {
  }


  ngOnInit() {
    this.loadFields();
    this.initForm();
  }

  loadFields() {
    this.httpService.get('fields').subscribe(
      data => {
        this.fields = data.fields;
      }, err => {
        console.log("error occurred loading from server");
      }
    );
  }

  initForm() {
    this.register = new FormBuilder().group({
        username: [null, [
          Validators.required,
        ]],
        email: [null, [
          Validators.email,
          this.emailValidator
        ]],
        password: [null, [
          this.passwordValidator
        ]],
        password_confirm: [null, [
          this.confirmValidator
        ]],
        student_id: [null, [
          this.studentValidator
        ]],
        fields: [null, [
          Validators.required
        ]]
      },
      // {
      //   validator: this.basicInfoValidation
      // }
    );
  }

  submit() {
    let data = {
      username: this.register.controls['username'].value,
      email: this.register.controls['email'].value,
      password: this.register.controls['password'].value,
      student_id: this.register.controls['student_id'].value,
      field: this.register.controls['fields'].value
    };
    console.log("data", data);
    this.httpService.post('register', data).subscribe(
      data => {
      	console.log("Da:ta", data);
      }, err => {
      	console.log("e:r", err);
      }
    );
  }

  emailValidator(input: FormControl) {
    let v: string = input.value;
    if (!v) {
      return {
        notUTAC: true
      }
    }
    if (v.includes("@ut.ac.ir"))
      return null;
    else
      return {
        notUTAC: true
      };
  }

  passwordValidator(input: FormControl) {
    let v = input.value;
    let error = {
      error: true
    };

    if (!v) {
      return error;
    }

    let validChar = false, validNum = false, validSpc = false;
    for (let i = 0; i < v.length; i++) {
      let asc = v[i].charCodeAt(0);
      if (asc >= 97 && asc <= 122)
        validChar = true;
      if (asc >= 65 && asc <= 90)
        validChar = true;
      if (asc >= 48 && asc <= 57)
        validNum = true;
      if (asc < 48 || (asc > 57 && asc < 65) || (asc > 90 && asc < 97) || asc > 122)
        validSpc = true;
    }

    if (validChar && validNum && validSpc && v.length >= 8)
      return null;
    return error;
  }

  confirmValidator(input: FormControl) {
    let v: string = input.value;
    let error = {confirm: true};
    let orig;
    if (input['parent'])
      orig = input['parent'].controls['password'].value;
    else
      return error;

    if (!v)
      return error;

    if (v === orig)
      return null;
    return error;
  }

  studentValidator(input: FormControl) {
    let v = input.value;
    let error = {std: true};
    if (!v)
      return error;

    if (v.toString().length == 9)
      return null;
    return error;
  }

  getErrorMessage() {
    return this.register.hasError('required') ? 'You must enter a value' :
      this.register.hasError('email') ? 'Not a valid email' :
        '';
  }
}
