import { Injectable } from '@angular/core';
import { PostService } from './post-service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'; // Import the 'tap' operator.

@Injectable({
  providedIn: 'root'
})

export class BackEndService {

constructor(private postService: PostService, private http:HttpClient) { 
  this.fetchData();
}

saveData() {
  const newlistofPost: Post[] = this.postService.getPost();
  this.http.put('https://baloloyfinaltest-default-rtdb.asia-southeast1.firebasedatabase.app/post.json', newlistofPost).subscribe((res) => {
  console.log(res);
})}
  
fetchData() {
  return this.http.get<Post[]>('https://baloloyfinaltest-default-rtdb.asia-southeast1.firebasedatabase.app/post.json').pipe(
  tap((newlistofPost: Post[]) => {
  console.log(newlistofPost);
  this.postService.setPosts(newlistofPost);
})
);
}

updateData(index: number, updatedPost: Post) {
  this.postService.updatePost(index, updatedPost);
  this.http.put(`https://baloloyfinaltest-default-rtdb.asia-southeast1.firebasedatabase.app/post/${index}.json`, updatedPost)
  .subscribe(response => {
  console.log(response);
});
}

deleteData(index: number){
  this.postService.deleteButton(index);
  this.http.delete(`https://baloloyfinaltest-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`)
  .subscribe(response => {
  console.log(response);
});
}

addComment(index: number, comment: string) {
  const post = this.postService.getSpecPost(index);
  post.comments.push(comment);
  this.http.put(`https://baloloyfinaltest-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, post)
  .subscribe(response => {
  console.log(response);
});
}
}
