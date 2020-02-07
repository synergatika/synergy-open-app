import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  posts_events: PostEvent[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private openDataService: OpenDataService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.fetchPostsEventsData();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  fetchPostsEventsData() {
    this.openDataService.readAllPublicPostsEvents()
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            console.log(this.posts_events)
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }
}
