import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {MatSnackBar} from "@angular/material";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm;

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = new FormBuilder().group({
      post: [null, [
        Validators.required
      ]]
    });
  }

  submit() {
    let data = {
      post: this.postForm.controls['post'].value
    };
    this.httpService.post('new_post', data).subscribe(
      data => {

      }, err => {
        if(err.status == 200) {
          this.snackBar.open("پست با موفقیت اضافه شد", null, {duration: 2000});
        }
        else {
          this.snackBar.open("متاسفانه پست ثبت نشد", null, {duration: 2000});
        }
      }
    );
  }

}
