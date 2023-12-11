import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PostService } from '../post-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  posts: any[] = [];
  commentText: string = ''; // Add this line

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.posts = this.postService.getPostsByUser(this.currentUser);
  }

  onClick(): void {
    // Add your onClick logic here
  }

  addComment(commentText: string): void {
    // Add your addComment logic here
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      const filePath = `profile-pictures/${this.currentUser.uid}`;
      const task = this.storage.upload(filePath, file);
    }
  }
}
