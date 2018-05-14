import { Injectable, Inject } from '@angular/core';
import {
    HttpClient
  } from '@angular/common/http';


import { SeachResult } from './search-result.model';
import { Observable } from 'rxjs';
import { map, filter, switchAll, tap, catchError } from 'rxjs/operators';

export const YOUTUBE_API_KEY =
  'AIzaSyBwV6W2pkTiaIPwK-2tpv69IAFYtDQ4uk0';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';


@Injectable()
export class YouTubeSearchService {
    constructor( private http: HttpClient,
               @Inject(YOUTUBE_API_KEY) private apiKey: string,
               @Inject(YOUTUBE_API_URL) private apiUrl: string) {

    }


    search(query: string): Observable<any> {
        const params: string = [
          `q=${query}`,
          `key=${this.apiKey}`,
          `part=snippet`,
          `type=video`,
          `maxResults=10`
        ].join('&');

        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl)
        .pipe(
          map(response => response['items'].map(
            item => new SeachResult({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url
            })
        )));
      }

}
