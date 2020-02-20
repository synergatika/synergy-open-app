import {CollectionViewer, DataSource} from "@angular/cdk/collections";
// RxJS
import { Observable, BehaviorSubject, of} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadEventsService } from '../../../core/services/loadEvents.service';

export class EventsDataSource implements DataSource<any> {
	private lessonsSubject = new BehaviorSubject<any>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private eventsService: LoadEventsService) {}

    connect(collectionViewer: CollectionViewer): Observable<any> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(courseId: number, filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);
        this.eventsService.findLessons(courseId, filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(lessons => this.lessonsSubject.next(lessons));
    }      
}
  
