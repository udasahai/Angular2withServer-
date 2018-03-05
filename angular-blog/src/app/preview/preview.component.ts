import { Component, OnInit } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'

import { fadeInAnimation } from '../_animations/index';
import { slideInOutAnimation } from '../_animations/index';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  animations: [slideInOutAnimation, fadeInAnimation],

})
export class PreviewComponent implements OnInit {

  post: Post = new Post();
  posts: Post[] = [];
  title:string = "";
  body:string = "";	
  parsedBody:string = "";
  parsedTitle:string = "";

  constructor(private blogService: BlogService,private route: ActivatedRoute,private router: Router) {
  }

  backToEdit():void {
  	this.router.navigateByUrl('/edit/' + this.post.postid);
  }

  getPost():void
  {
  	let pid:number = Number(this.route.snapshot.paramMap.get('id'));
  	this.post = this.blogService.getPost(pid);
  	this.title = this.post.title;
  	this.body = this.post.body;

  var reader = new Parser();
	var writer = new HtmlRenderer();
	var parsed = reader.parse(this.body); // parsed is a 'Node' tree
	// transform parsed if you like...
	this.parsedBody = writer.render(parsed); // result is a String
	document.getElementById("common").innerHTML = this.parsedBody;

  var parTitle = reader.parse(this.title);
  this.parsedTitle = writer.render(parTitle);
  document.getElementById("badge").innerHTML = this.parsedTitle;
  }

  ngOnInit() {
  	  this.route.params.subscribe(() => this.getPost());
  }

}
