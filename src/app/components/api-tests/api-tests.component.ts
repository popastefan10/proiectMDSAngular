import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Post } from '../../models/post.model';
import { SessionUser } from '../../models/session-user.model';
import { UserService } from 'app/core/services/user.service';
import { tap } from 'rxjs';
import { PostCreate } from '../../models/post-create.model';
import { PostService } from 'app/core/services/post.service';
import { CommentService } from 'app/core/services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'mds-api-tests',
  templateUrl: './api-tests.component.html',
  styleUrls: ['./api-tests.component.scss']
})
export class ApiTestsComponent {
  title = 'proiectMDSAngular';

  picturesURLs?: string[] = undefined;

  post?: Post;
  userInfo?: SessionUser;
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  signupForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  postForm = this.formBuilder.group({
    description: '',
  });

  postMedia?: File[] = undefined;

  deletePostForm = this.formBuilder.group({
    id: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private userService: UserService, private postService: PostService,
    private commentService: CommentService) { }

  ngOnInit() {
    // this.http.get<UserInfo>('/api/whoami', { withCredentials: true }).subscribe((x) => {
    //   this.userInfo = x;
    //   this.loginForm.reset();
    // });
  }

  onSubmit(): void {
    this.http
      .post('/api/login', this.loginForm.value, { responseType: 'text', withCredentials: true })
      .subscribe((x) => {
        console.log(x);
        this.ngOnInit();
      });
  }

  onSignUp(): void {
    this.http.post<SessionUser>('/api/signup', this.signupForm.value, { withCredentials: true }).subscribe((x) => {
      console.log(x);
      this.ngOnInit();
    });
  }

  onLogOut(): void {
    this.http.get('/api/logout', { responseType: 'text', withCredentials: true }).subscribe((x) => {
      this.ngOnInit();
    });
  }

  onCreatePost(): void {

    let postCreate: PostCreate = {
      description: this.postForm.value.description,
      media: this.postMedia
    };

    this.postService.create(postCreate)
      .pipe(
        tap(x => console.log(x))
      )
      .subscribe();
  }

  onFileSelected(event: any) {

    this.postMedia = event?.target?.files;
  }

  onDeletePost(): void {
    this.postService.delete(this.deletePostForm.value.id!).subscribe((x) => {
      console.log(x);
      this.post = undefined;
      this.ngOnInit();
    });
  }

  public whoAmI(): void {
    this.userService
      .whoAmI()
      .pipe(tap((user) => console.log('whoAmI:', user)))
      .subscribe();
  }

  public getSinglePost(): void {
    this.postService.getSinglePost("519fc696-e288-4211-a58b-548ac1307948")
      .pipe(
        tap(x => console.log(x))
      )
      .subscribe();
  }

  public getPostsByUser(): void {
    this.postService.getPostsByUser("89604f4c-d376-449c-91b3-8fb5b8624504")
      .pipe(
        tap(x => console.log(x))
      )
      .subscribe();
  }

  public onPatchPost(): void {
    let data: Partial<Post> = {
      id: "c1a4d89c-8725-4c98-bcdc-497e1499f139",
      description: "changed description!",
    };

    this.postService.patch(data)
      .pipe(
        tap(x => console.log(x))
      )
      .subscribe();
  }

  public getPostMedia(): void {

    this.postService.getPostMedia("57b24347-6c9f-4fa7-ac7c-556b4c649579")
      .subscribe(x => this.picturesURLs = x.content.picturesURLs);
  }

  public createComment(): void {

    let data: Partial<Comment> = {
      postId : "57b24347-6c9f-4fa7-ac7c-556b4c649579",
      content: "Comment nou!",
      parentId: "9b4aa363-5ffe-4da0-8c35-5396efe86d70",
    };
    this.commentService.create(data)
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();
  }

  public getComment(): void {

    this.commentService.get("9b4aa363-5ffe-4da0-8c35-5396efe86d70")
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();
  }

  public patchComment(): void {
    let data: Partial<Comment> = {
      id : "9b4aa363-5ffe-4da0-8c35-5396efe86d70",
      content: "Comment modificat!",
    };

    this.commentService.patch(data)
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();
  }

  public getCommentReplies(): void {

    this.commentService.getCommentReplies("9b4aa363-5ffe-4da0-8c35-5396efe86d70")
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();
  }

  public getPostReplies(): void {
    this.commentService.getPostReplies("57b24347-6c9f-4fa7-ac7c-556b4c649579")
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();
  }

  public logout(): void {
    this.userService.logout().subscribe();
  }

}
