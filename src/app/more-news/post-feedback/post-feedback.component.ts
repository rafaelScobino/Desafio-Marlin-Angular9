import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit {

  @Input('isPosted') isPosted:boolean;
  @Input('postId') postId: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.postId)
  }

  goToDetails(){
  this.isPosted = false;
  console.log('navigating')
    this.router.navigate(
    ['/news-detail'],
    { queryParams: { id: parseInt(this.postId)}})
  }

}
