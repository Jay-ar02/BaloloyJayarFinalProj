import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post-service'; 
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service'; // Import BackEndService


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() index: number = 0;
  @Input() post?: Post;
  commentText: any;
  isHovered = false;
  showCommentBox = false;
 
  
  constructor(private postService: PostService, private router: Router,  private backEndService: BackEndService)  {

   }

  ngOnInit(): void {
    console.log(this.post)
  }
  delete(){
    // this.postService.deleteButton(this.index);
    this.backEndService.deleteData(this.index);
  }

  onEdit(){
    this.router.navigate(['/post-edit', this.index]);
  }

  onClick(){
    this.postService.LikePost(this.index)
  }

  addComment(commentText: string){
    if (commentText.trim() !=='') { // check if comment is empty
      this.postService.addComment(this.index, commentText);
      this.commentText = '';
    }
  }

  chooseReaction(reaction: string) {
    // Handle the selected reaction (e.g., send to the server or update locally)
    console.log(`Selected reaction: ${reaction}`);
  }
  
  toggleCommentBox(): void {
    this.showCommentBox = !this.showCommentBox;
  }
}
