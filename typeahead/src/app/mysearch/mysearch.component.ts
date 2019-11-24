import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Comment} from '../myclasses/comment';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-mysearch',
  templateUrl: './mysearch.component.html',
  styleUrls: ['./mysearch.component.css']
})
export class MysearchComponent implements OnInit {

  comments$: Observable<Comment[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private commentService: CommentService
  ) {}

  // Pattern Observable!
  //
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.comments$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.commentService.searchComments(term)),
    );
  }

}
