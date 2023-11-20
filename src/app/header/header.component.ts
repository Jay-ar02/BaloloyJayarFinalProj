import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post-service'; // Import PostService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listOfPosts: any;
  searchKeyword: string;


  constructor(
    private backEndService: BackEndService,
    private postService: PostService // Inject PostService
  ) {
    this.searchKeyword = '';
  }

  ngOnInit(): void {
  }

  onSave() {
    this.backEndService.saveData();
  }

  onFetch() {
    this.backEndService.fetchData().subscribe(() => {
        this.listOfPosts = this.postService.getPost(); // Access data through PostService
    });
}

searchPosts() {
  this.postService.searchPosts(this.searchKeyword);
}
}
