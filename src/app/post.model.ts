export class Post{
    constructor(
        public title: string,
        public author: string,
        public description: string,
        public dateCreated: Date,
        public imgPath: string,
        public numberOfLikes: number,
        public postedBy: String,
        public comments: string[] = [] ){
        }
}