import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService{
    listOfPosts: Post[] = [
        new Post(
          'Blog',
          'Jay-ar Baloloy',
          'A blog is a website or page that is a part of a larger website. Typically, it features articles written in a conversational style with accompanying pictures or videos.',
          new Date(),
          'https://images.alphacoders.com/132/1328866.png',  
           0

        ),
          ];
          getPost(){
            return this.listOfPosts;
          }
          deleteButton(index: number){
            this.listOfPosts.splice(index, 1)
          }
          addPost(post: Post){
            this.listOfPosts.push(post);
          }
          updatePost(index: number, post: Post){
            this.listOfPosts[index] = post;
          }
          getSpecPost(index: number){
          return this.listOfPosts[index];
}
LikePost(index: number){
this.listOfPosts[index].numberOfLikes += 1;
}
addComment(index: number, comment: string){
  this.listOfPosts[index].comments.push(comment);
}
}
