import { Injectable } from '@angular/core';
import { File } from '../types/file.type';
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesSource = new BehaviorSubject<File[]>([]);

  constructor(private http: Http) { }

  getFiles(): Observable<File[]>
  {
    this.http.get("api/v1/files")
        .toPromise()
        .then((res: Response) => {
      this.filesSource.next(res.json());
    }).catch(this.handleError);
    return this.filesSource.asObservable();
  }

  getFile(id: Number): Promise<File>{
    return this.http.get("api/v1/files/${id}").toPromise()
                .then((res: Response) => res.json())
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.log('Error occurred', error);
    return Promise.reject(error.body || error);
  }
}
