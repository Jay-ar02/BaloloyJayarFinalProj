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
  profilePictureUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&usqp=CAU'; // default image
  selectedFile: File | null = null;
  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.authService.fetchUserData(this.currentUser.uid).then(userData => {
        if (userData && userData.profilePictureUrl) {
          this.profilePictureUrl = userData.profilePictureUrl;
        }
      });
    }
    this.posts = this.postService.getPostsByUser(this.currentUser);
  }

  onClick(): void {
    // Add your onClick logic here
  }

  addComment(commentText: string): void {
    // Add your addComment logic here
  }

  // Add a new property to store the selected file

onFileSelected(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selectedFile = inputElement.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.profilePictureUrl = (e.target as FileReader).result as string;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }
}

// New method to upload the file
async uploadFile() {
  if (this.selectedFile) {
    try {
      const url = await this.authService.uploadProfilePicture(this.selectedFile);
      console.log('File uploaded successfully. URL:', url);
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  } else {
    console.log('No file selected');
  }
}
}
