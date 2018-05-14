import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

// By importing just the rxjs operators we need, We're theoretically able
// to reduce our build size vs. importing all of them.
import { Observable, fromEvent  } from 'rxjs';
import { debounceTime, filter, switchAll, tap, map } from 'rxjs/operators';

import { YouTubeSearchService } from './you-tube-search.service';
import { SeachResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template: `
    <div class="ui  icon input">
      <input type="text" class="form-control" placeholder="Search" autofocus>
      <i class="inverted circular search link icon"></i>
    </div>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SeachResult[]> = new EventEmitter<SeachResult[]>();

  constructor(private youtube: YouTubeSearchService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup')
    .pipe(
          map((e: any) => e.target.value),
          filter((text: string) => text.length > 1),
          debounceTime(500),
          map((query: string) => this.youtube.search(query))
          , switchAll()
     ).subscribe(
      //  resp => {
      //   resp.subscribe( res => {
      //     console.log(res);
      //   });
      //  }
      (results: SeachResult[]) => { // on sucesss
             this.loading.emit(false);
             this.results.emit(results);
            },
            (err: any) => { // on error
               console.log(err);
                 this.loading.emit(false);
            },
                () => { // on completion
                   this.loading.emit(false);
            }
          );
  }
}
