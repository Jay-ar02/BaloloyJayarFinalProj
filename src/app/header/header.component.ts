import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post-service'; // Import PostService
import { ThemeService } from '../Theme.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listOfPosts: any;
  searchKeyword: string;
  showNotification = false;

  constructor(
    private backEndService: BackEndService,
    private postService: PostService, // Inject PostService
    public themeService: ThemeService
  ) {
    this.searchKeyword = '';
  }

  onSave() {
    this.backEndService.saveData();
  }

  onFetch() {
    this.backEndService.fetchData().subscribe(() => {
        this.listOfPosts = this.postService.getPost(); // Access data through PostService
    });
    }

    // Searching
    searchPosts() {
    this.postService.searchPosts(this.searchKeyword);
    }

  ngOnInit(): void {
  this.postService.newPostEvent.subscribe(() => {
  this.showNotification = true;
  setTimeout(() => {
  this.showNotification = false;
  }, 3000);
  });
  }

  // Sorting
  sortPosts(): void {
  this.postService.sortPosts();
  }
}
