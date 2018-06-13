import { Component, OnInit, Inject } from '@angular/core';

import { File } from '../../types/file.type'
import { Subscription } from 'rxjs';

const FILES: File[] =[
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
  {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"},
  {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
  {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"}
];

@Component({
  selector: 'app-file-display',
  templateUrl: './file-display.component.html',
  styles: ['./file-display.component.css']
})
export class FileDisplayComponent implements OnInit {

  files : File[] = [];
  sub: Subscription;
  keySub: Subscription;

  keyword: string = "";

  constructor(@Inject("filesInfo") private filesInfo,
              @Inject("keywords") private keywords) { }

  ngOnInit() {
    this.getFiles();
    this.getKeywords();
  }

  getFiles(): void {
    this.sub = this.filesInfo.getFiles().subscribe(files=> this.files = files);
  }

  getKeywords(): void{
    this.keySub = this.keywords.getKeywords()
                      .subscribe(key=>this.keyword=key);
  }

}
