import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  post;
  username;

  constructor(private route: ActivatedRoute, private httpService: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params['username'] ? params['username'] : null;
        this.httpService.get(`profile/${this.username}`).subscribe(
          data => {
            console.log(data);
            this.post = data.posts[0];
          }, err => {
            this.post = {
              text: "این متن دلخواه برای این نوشته است.",
              likes: 2,
              dislikes: 3,
              comments: 5
            }
            this.username = "iman";
          }
        );
      }
    );
  }

  goToProfilePage() {
    this.router.navigate([`profile/${this.username}`]);
  }

}
