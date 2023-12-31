import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post-service';
import { Post } from '../post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackEndService } from '../back-end.service'; // Import BackEndService
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {
  form!: FormGroup;
  index: number = 0;
  editmode = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private backEndService: BackEndService, // Inject BackEndService
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    let editTitle = '';
    let editDescription = '';
    let editImgPath = '';

    this.actRoute.params.subscribe((params: Params) => {
      if (params['index']) {
        this.index = +params['index'];
        const post = this.postService.getSpecPost(this.index);
        editTitle = post.title;
        editDescription = post.description;
        editImgPath = post.imgPath;
        this.editmode = true;
      }
    });

    this.form = new FormGroup({
      title: new FormControl(editTitle, [Validators.required]),
      imgPath: new FormControl(editImgPath, [Validators.required]),
      description: new FormControl(editDescription, [Validators.required])
    });
    }

  onSubmit() {
    const title = this.form.value.title;
    const imgPath = this.form.value.imgPath;
    const description = this.form.value.description;
    const user = this.authService.getCurrentUser();
const postedBy = user?.email || 'anonymous';
    const post: Post = new Post(title, '', description, new Date(), imgPath, 0, postedBy);
    if (this.editmode) {
      this.postService.updatePost(this.index, post);
      this.backEndService.updateData(this.index, post);
    } else {
      this.postService.addPost(post);
      this.backEndService.saveData();
    }
      this.router.navigate(['post-list']);
    }
}
