import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  file: File;

  constructor(
    private route: ActivatedRoute,
    @Inject("filesInfo") private filesInfo
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      console.log(params);
      this.filesInfo.getFile(+params["id"]).subscribe(file => this.file=file);//then(file => this.file = file);
    });
  }

}
