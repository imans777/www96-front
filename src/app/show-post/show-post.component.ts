import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  post = {
    text: '',
    likes: 0,
    dislikes: 0,
    comments: 0
  };
  username;

  constructor(private route: ActivatedRoute, private httpService: HttpService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params['username'] ? params['username'] : 'iman';
        this.httpService.get(`profile/${this.username}`).subscribe(
          data => {
            data = data[0];
            console.log(data);
            if (data['posts'] && data['posts'].length > 0)
              this.post = data.posts[0];
            else {
              this.post = {
                text: "این متن دلخواه برای این نوشته است.",
                likes: 2,
                dislikes: 3,
                comments: 5
              }
              this.username = "iman";
            }
          }, data => {
            if (data['posts'] && data['posts'].length > 0)
              this.post = data.posts[0];
            else {
              this.post = {
                text: "این متن دلخواه برای این نوشته است.",
                likes: 2,
                dislikes: 3,
                comments: 5
              }
              this.username = "iman";
              // this.post = {
              //   text: "این متن دلخواه برای این نوشته است.",
              //   likes: 2,
              //   dislikes: 3,
              //   comments: 5
              // }
              // this.username = "iman";
            }
          });
      }
    );
  }

  goToProfilePage() {
    this.router.navigate([`profile/${this.username}`]);
  }

  addLikes(likes = true) {
    let data = {
      id: this.post['id'],
      like: likes
    };
    console.log("lik", data);
    this.httpService.post(`like`, data).subscribe(
      data => {
        console.log("here");
        this.increment(likes);
      }, err => {
        // if(err.status == 200) {
        //   console.log("there");
        //   this.increment(likes);
        // }
        // else {
        //   console.log("dec");
        //   this.decrement(likes);
        // }
        this.httpService.get(`profile/${this.username}`).subscribe(
          data => {
            data = data[0];
            console.log(data);
            if (data['posts'] && data['posts'].length > 0)
              this.post = data.posts[0];
          });
      }
    );
  }

  increment(likes = true) {
    if (likes) {
      this.post['likes']++;
    }
    else {
      this.post['dislikes']++;
    }
  }

  decrement(likes = true) {
    if (likes) {
      this.post['likes']--;
    }
    else {
      this.post['dislikes']--;
    }
  }

  report() {
    let data = {
      idid: this.post['id']
    };
    console.log("dara:", data);
    this.httpService.post(`report`, data).subscribe(
      data => {
        console.log("here");
      }, err => {
        this.snackBar.open('پست با موفقیت گزارش شد.', null, {duration: 2000});
      }
    );
  }

}
