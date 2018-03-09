import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {MatSnackBar} from "@angular/material";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login;

  constructor(private httpService: HttpService, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.login = new FormBuilder().group({
      username: [null, [
        Validators.required
      ]],
      password: [null, [
        this.passwordValidator
      ]]
    });
  }

  submit() {
    let data = {
      username: this.login.controls['username'].value,
      password: this.login.controls['password'].value
    };

    this.httpService.post('login', data).subscribe(
      data => {

      }, err => {
        if(err.status == 200) {
          console.log("login successfully!");
          this.router.navigate([`profile/${data.username}`]);
        }
        else {
          this.snackBar.open("اطلاعات نامعتبر است", null, {duration: 2000});
        }
      }
    )
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

}
