import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const Url = 'http://localhost:4200/';
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  public getAuthorsInfo(id: number): Observable<any> {
    return this.http
      .get<any>(Url + 'authors/' + id)
      .pipe(
        map((response) =>
          response._embedded ? response._embedded.authors : undefined
        )
      );
  }
}
