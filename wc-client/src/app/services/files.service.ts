import { Injectable } from '@angular/core';
import { File } from '../types/file.type';
import { Http, Response, Headers,RequestOptions  } from '@angular/http';
//import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesSource = new BehaviorSubject<File[]>([]);

  

  constructor(private http: HttpClient) { }

  getFiles(): Observable<File[]>
  {
    return this.http.get<File[]>("api/v1/files");
    // this.http.get("api/v1/files")
    //     .toPromise()
    //     .then((res: Response) => {
    //   this.filesSource.next(res.json());
    // }).catch(this.handleError);
    // return this.filesSource.asObservable();
  }

  getFile(id: Number): Observable<File>{
    // return this.http.get(`api/v1/files/${id}`).toPromise()
    //             .then((res: Response) => res.json())
    //             .catch(this.handleError);
    return this.http.get<File>(`api/v1/files/${id}`);
  }

  createFile(file: File): Observable<File>{
    //let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //let header = new Headers({'content-type':'application/json'});
    //headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: header });
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // return this.http.post('api/v1/files', file, httpOptions).toPromise().then((res: Response) => {
    //   this.getFiles();
    //   return res.json();
    // }).catch(this.handleError);
    return this.http.post<File>('api/v1/files', file, httpOptions);
  }

  private handleError(error: any): Promise<any>{
    console.log('Error occurred', error);
    return Promise.reject(error.body || error);
  }
}
