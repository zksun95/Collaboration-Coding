import { Component, OnInit } from '@angular/core';
//import * as ace from 'ace-builds/src-min-noconflict/ace.js';
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  constructor() { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.$blockScrolling = Infinity;
  }

}
