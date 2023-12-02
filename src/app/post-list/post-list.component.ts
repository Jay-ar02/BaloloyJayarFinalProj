import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post-service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [];
  searchResults: Post[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private postService: PostService,
    private backEndService: BackEndService
  ) {}

  ngOnInit(): void {
    this.backEndService.fetchData().subscribe((post: Post[]) => {
    this.listOfPosts = post;
    this.postService.searchResults.subscribe(results => {
    this.searchResults = results;
    });
    });
  }
  
  getDisplayedPosts(): Post[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.listOfPosts.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.listOfPosts.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  sortPosts(): void {
    this.listOfPosts.sort((a, b) => b.title.localeCompare(a.title));
  }
}
