/**
 * 
 * Home Component.
 * The class below shows detailed basic HttpClient CRUD operations.
 * The spaces are for the code to be more readable.
 * Author: Christian N Mdima.
 * Date: 05 Oct 19.
 * 
 **/

import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { $ } from 'protractor';
import { IPost } from 'src/app/interfaces/post';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 
/** 
   * In this class we have all the CRUD functionality.  
   * Each CRUD function calls the PostService I created
**/
export class HomeComponent implements OnInit {
 
  @BlockUI() blockUI: NgBlockUI;

  // Array on posts with a specific interface IPost[].
  posts: IPost[] = [];

  constructor(private postsService: PostsService) { }

  /** 
   * Call getPosts service on the app's startup Lifecyle Hook.  
  **/
  ngOnInit(): void {
    this.blockUI.start();
    this.postsService.getPosts().subscribe(
      posts => {
        this.posts = posts;
        this.blockUI.stop();
      },
      
      //error => this.errorMessage = <any>error
    );

    console.log(this.posts);
  }

  /** 
   * Searching posts by userId.  
  **/
  search(dataPassed) {
    this.postsService.searchPosts(dataPassed).subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

  /** 
   * Creating a new post.  
  **/
  create(data){
    console.log(data);
    this.postsService.createPost(data).subscribe(
      res => {
        Swal.fire('Saved!','Your post was created successfully.','success')
      }
      
    );

    
  }

  /** 
   * Deleting post.  
   * Uses Sweetalert2 popups and confirmations.
  **/
  delete(data){
    const Swal = require('sweetalert2')
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete PostID: ${data}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

      if (result.value) {

        this.postsService.deletePost(data).subscribe();
        
        Swal.fire(
          'Deleted!',
          'Post deleted successfully',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Post not deleted',
          'info'
        )
      }
    })
  }

  /** 
   * Update post.  
   * Uses Sweetalert2 popups and confirmations.
  **/
  update(id, title, body){
    const Swal = require('sweetalert2')
    Swal.fire({
      title: `Edit Post ${id}`,
      html: `
      <div class="form-group">
          <label for="ttl">Title:</label>
          <input type="text" class="form-control" id="ttl"  name="title" value="${title}" required>
      </div>
      <div class="form-group">
          <label for="bdy">Body:</label>
          <textarea class="form-control" name="body" required>${body}</textarea>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.value) {

        this.postsService.updatePost(id, title, body);

        Swal.fire(
          'Updated!',
          'Post updated successfully',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'No changes saved',
          'info'
        )
      }
    })
  }
}

