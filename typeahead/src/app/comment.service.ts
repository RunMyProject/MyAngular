import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Comment } from './myclasses/comment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /* 
   * GET comments by name 
   */
  searchComments(term: string): Observable<Comment[]> {
    //
    // term.trim().length<=3 ???
    // *************************
    if (!term.trim() || term.length<=3) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Comment[]>(`${this.commentsUrl}/?q=${term}`).pipe(
      tap(_ => this.log(`found comments matching "${term}"`)),
      catchError(this.handleError<Comment[]>('searchComments', []))
    );
  }

  /*
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   *
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CommentService: ${message}`);
  }

}
