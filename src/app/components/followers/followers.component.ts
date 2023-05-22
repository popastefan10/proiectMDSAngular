import { Component, Input, OnInit } from '@angular/core';
import { Followers } from 'app/models/followers.model';
@Component({
  selector: 'mds-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  @Input() followers: Followers = { followers: '100', following: '50', isFollowing: "" };

  ngOnInit() {
    // Trebuiesc cerute datele din BD
  }

  follow() {
    // Trebuie apelata functia de follow
    console.log("Following user...");
  }


}
