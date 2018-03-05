import { Component, OnInit, ViewChild, AfterViewInit,HostListener,Directive,HostBinding,Input} from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'
import { DatePipe } from '@angular/common';

import { fadeInAnimation } from '../_animations/index';
import { slideInOutAnimation } from '../_animations/index';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations: [slideInOutAnimation, fadeInAnimation],
})
export class EditComponent implements OnInit {

  post: Post = new Post();
  posts: Post[] = [];
  // title:string = "";
  // body:string = "";
  @ViewChild('myForm') myform: any;

  constructor(private blogService: BlogService,private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
  	this.route.params.subscribe(() => this.getPost());
  }

  deletePost():void {
    this.blogService.deletePost(this.post.postid);
    this.router.navigateByUrl('/');
  }

  // updateArray(): void {
  //   // this.post.title = this.title; 
  //   // this.post.body = this.body; 
  //   this.blogService.updateCache(this.post);
  // }

  toPreview():void {
    // this.post.title = this.title;   
    // this.post.body = this.body;
    this.saveBlog();
    this.router.navigateByUrl('/preview/' + this.post.postid);
  }

  getPost():void {

   if(this.myform != undefined && this.myform != null)
    if(!this.myform.form.pristine)
    {
      this.saveBlog(); 
      this.myform.form.markAsPristine();
    }

  	let pid:number = Number(this.route.snapshot.paramMap.get('id'));
  	this.post = this.blogService.getPost(pid);
    // if(this.post != undefined && this.post != null) {
    // 	// this.title = this.post.title;
    // 	// this.body = this.post.body;
    // }
  }

  saveBlogWithoutTimeChange() {
  	// this.post.title = this.title; 
  	// this.post.body = this.body;
  	this.blogService.updatePost(this.post);
  }


  @HostListener('window:beforeunload')
  saveBlog(): void {
  	// this.post.title = this.title; 
  	// this.post.body = this.body;
  	this.post.modified = new Date();
  	this.blogService.updatePost(this.post);
    this.myform.form.markAsPristine();
  }

}
