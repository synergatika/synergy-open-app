import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { LoadWpContentService } from '../../../core/services/load-wp-content.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private unsubscribe: Subject<any>;
  content: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private loadWPContent: LoadWpContentService,
  ) { }

  ngOnInit() {
    this.unsubscribe = new Subject();
    this.content = null;
    this.fetchContent('68');
  }

  fetchContent(page_id) {
    this.loadWPContent.getContent(page_id).subscribe((data) => {
      this.content = data.content.rendered;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
