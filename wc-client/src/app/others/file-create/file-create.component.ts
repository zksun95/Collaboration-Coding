import { Component, OnInit } from '@angular/core';
import { File } from '../../types/file.type'

const EMPTY_FILE: File = Object.freeze({
  id: 0,
  name: "",
  description: "",
  owner: "",
  auth: "Owner Only"
})


@Component({
  selector: 'app-file-create',
  templateUrl: './file-create.component.html',
  styleUrls: ['./file-create.component.css']
})

export class FileCreateComponent implements OnInit {

  public auths = [
    "Owner Only",
    "Authed Users",
    "Authed Users Read only",
    "Public",
    "Public Read Only"
  ];

  newFile: File = Object.assign({}, EMPTY_FILE)

  constructor() { }

  ngOnInit() {
  }

}
