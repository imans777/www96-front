import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {
    avatar: 'data:image/jpeg;base64,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',
    username: '',
    email: '',
    field: '',
    posts: []    
  };
  username;
  tempImageUrl = 'data:image/jpeg;base64,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';

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params['username'] ? params['username'] : null;
        this.httpService.get(`profile/${this.username}`).subscribe(
          data => {
            data = data[0];
            // console.log(data);
            if(data['posts']) {
              data['posts'].forEach((e, i) => {
                data['posts'][i]['text'] = data['posts'][i]['text'].substring(0, 30) + (data['posts'][i]['text'].length >= 30 ? '...' : '');
              });
            }
            this.profile = data;
            console.log("this profile", this.profile);
          }, data => {
            // let posts = [
            //   {
            //     text: 'این اولین متن ما است.',
            //     likes: 3,
            //     dislikes: 2,
            //     comments: 1,
            //   }, {
            //     text: 'این دومین متن ما است و اندکی این طولانی تر است اما تقریبا شبیه به همان است :دی'.substring(0, 30) + '...',
            //     likes: 10,
            //     dislikes: 11,
            //     comments: 20,
            //   }
            // ];
            // this.profile = {
            //   avatar: 'data:image/jpeg;base64,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',
            //   username: "Iman",
            //   email: "iman@ut.ac.ir",
            //   field: 'CE',
            //   posts: posts
            // }
            // this.username = "iman";

            if(data['posts']) {
              data['posts'].forEach((e, i) => {
                data['posts'][i]['text'] = data['posts'][i]['text'].substring(0, 30) + (data['posts'][i]['text'].length >= 30 ? '...' : '');
              });
            }
            this.profile = data;
          }
        );
      }
    );
  }

}
