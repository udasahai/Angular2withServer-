import { Injectable, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import * as jwt from 'jsonwebtoken';

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}


@Injectable()
export class BlogService {

	private posts: Post[] = [];
	maxPostId: number;
//  private listPosts: Post[] = [];		

  constructor(private router: Router) { this.maxPostId=0; this.fetchPosts(); }




  fetchPosts(): void {

      var xmlhttp = new XMLHttpRequest();
      var self = this; 
      xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // console.log(xmlhttp.responseText);
        var Posts = JSON.parse(xmlhttp.responseText);

        //console.log(Posts);

        // var Post = (Posts[0].title);
        // console.log(Post);

        for(let i=0;i<Posts.length;i++) {
          let temp: Post = new Post();
          temp.postid = Posts[i].postid;
          temp.created = Posts[i].created;
          temp.modified = Posts[i].modified;
          temp.title = Posts[i].title;
          temp.body = Posts[i].body;
          if(temp.postid > self.maxPostId) { self.maxPostId = temp.postid; }
          self.posts.push(temp);
        }
      }
    };


    try {

    var token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var decoded = jwt.decode(token, {complete: true});
    var usr = decoded.payload.usr; 
    //console.log(usr);
    } catch(err)
    {
       this.router.navigateByUrl('/edit');
    }
    var url = "http://localhost:3000/api/" + usr; 


    xmlhttp.open("GET", url , true);
    xmlhttp.send();
  }

  getPosts(): Post[] { return this.posts; }

  getPost(id: number): Post {
  	
  	for (let post of this.posts)
  	{
  		if(post.postid == id)
  			return	post;
  	}
  	return null;
  }

  // updateCache(post: Post): void {
  //   for(let i:number=0;i<this.posts.length;i++) {
  //     if(this.posts[i].postid == post.postid) {
  //       this.posts[i] = post;
  //     }
  //   }
  // }

  newPost(): Post {

      var xmlhttp = new XMLHttpRequest();
      var self = this;


      let temp:Post = new Post();
      temp.postid = this.maxPostId + 1;
      temp.created = new Date(); 
      temp.modified = new Date();
      temp.title = ""; 
      temp.body = ""; 


    var token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var decoded = jwt.decode(token, {complete: true});
    var usr = decoded.payload.usr; 

     var url = "http://localhost:3000/api/" + usr + "/" + temp.postid;
    
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({title:'', body:''}));

    if(xmlhttp.status === 201)
    {
       this.posts.push(temp);
       this.maxPostId++;
       return temp;
    }
    else {
      alert("Error creating new Post");
      this.router.navigateByUrl('/');
      return null;
    }
      
  }

	updatePost(post: Post): void {

        var token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var decoded = jwt.decode(token, {complete: true});
        var usr = decoded.payload.usr; 

				var url = "http://localhost:3000/api/" + usr + "/" + post.postid;
        var xmlhttp = new XMLHttpRequest();
        var self= this;
         xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             
             for(var i=0;i<self.posts.length;i++)
             {
               if(self.posts[i].postid == post.postid){
                 self.posts[i] = post;
               }
             }
          }
          else if(xmlhttp.readyState == 4)
          {
            alert("Update Failed at Server");
            self.router.navigateByUrl('/edit/'+post.postid);
          }
        };
        xmlhttp.open("PUT", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({title:post.title, body:post.body}));
		
	}

	deletePost(postid: number): void {

        var token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var decoded = jwt.decode(token, {complete: true});
        var usr = decoded.payload.usr; 

	      var url = "http://localhost:3000/api/" + usr + "/" + postid;
        var xmlhttp = new XMLHttpRequest();
        var self= this;
         xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
             
             for(var i=0;i<self.posts.length;i++)
             {
               if(self.posts[i].postid == postid){
                 self.posts.splice(i,1);
               }
             }
          }
          else if(xmlhttp.readyState == 4){
            alert("Error deleting post");
            self.router.navigateByUrl("/");
          }
        };
        xmlhttp.open("DELETE", url, true);
        xmlhttp.send();
	}


}
