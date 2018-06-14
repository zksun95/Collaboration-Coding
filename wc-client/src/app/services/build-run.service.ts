import { Injectable, Inject } from '@angular/core';
import { File } from '../types/file.type';
import { Http, Response, Headers,RequestOptions  } from '@angular/http';
//import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BuildRunService {

  constructor(private http: HttpClient) { }

  buildAndRun(data): Observable<Object>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Object>('api/v1/build_run', data, httpOptions);
  }

}
