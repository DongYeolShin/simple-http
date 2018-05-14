import { Component, OnInit, Input } from '@angular/core';
import { SeachResult } from './search-result.model';

@Component({
  selector: 'app-you-tube-search',
  templateUrl: './you-tube-search.component.html',
  styleUrls: ['./you-tube-search.component.css']
})
export class YouTubeSearchComponent implements OnInit {
  @Input() result: SeachResult[];

  results: SeachResult[];
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  updateResults(results: SeachResult[]): void {
    this.results = results;
    // console.log("results:", this.results); // uncomment to take a look
  }

}
