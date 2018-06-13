import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  private keywords$ = new BehaviorSubject<string>('');

  constructor() { }

  setKeywords(keywords){
    this.keywords$.next(keywords);
  }

  getKeywords(): Observable<string>{
    return this.keywords$.asObservable()
  }
}
