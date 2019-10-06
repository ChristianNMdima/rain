import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})


export class PostsService {

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }
  

  /** 
   * Fetching all the posts from the api.  
   * I did not pass any headers in this specific call. 
  **/
  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postsUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))), // Testing the response.
        catchError(this.handleError)
    ); 
  }
  

  /** 
   * Searching posts by userId.  
   * Contains Params
  **/
 searchPosts(dataPassed): Observable<IPost[]> {

   // If Search box is empty.
   (dataPassed =="" ? console.log('Nothing to search'): dataPassed = dataPassed);

    return this.http.get<IPost[]>(this.postsUrl,{
      params: {
        userId: dataPassed
      }
    }).pipe(
        tap(data => JSON.stringify(data),
        catchError(this.handleError))
    ); 
  }

  /** 
   * Creating new post.  
   * Please note that the https://jsonplaceholder.typicode.com/posts doesn't really saves data, but only return request status
  **/
  createPost(post): Observable<IPost[]> {

    return this.http.post<IPost[]>(this.postsUrl, post, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
        catchError(this.handleError)
      );

      console.log(`New post!`) // For testing
  }

  /** 
   * Updating existing post using Put.  
   * Contains Params
   * Contains Headers
  **/
  updatePost(id, title, body): Observable<IPost[]> {

    console.log(`Post ${id} updated!`) // For testing

    return this.http.put<IPost[]>(this.postsUrl, {
      params: {
        userId: 1,
        postId: id,
        title: title,
        body: body
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
        catchError(this.handleError)
      );
  }

  /** 
   * Deleting a post by postId.  
   * Contains Params
  **/
  deletePost(postId): Observable<{}> {
    const url = `${this.postsUrl}/${postId}`;
    console.log(`Post ${postId} deleted!`) // For testing
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Http error handling.
  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;

    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}