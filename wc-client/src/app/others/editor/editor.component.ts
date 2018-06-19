import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { BEGINNINGS, LANGUAGES } from './language';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  sessionId: any;

  languages: string[] = LANGUAGES;
  language: string = "";

  result: string = "";
  rbuild: string = "";
  rrun: string = "";

  constructor(@Inject("collaboration") private collaboration,
              @Inject("buildAndRun") private runTest,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.language = this.languages[0];
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(){
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    //this.editor.getSession().setMode("ace/mode/"+this.language.toLowerCase());
    this.resetCode();
    this.editor.$blockScrolling = Infinity;

    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.sessionId, this.editor);
    this.editor.lastAppliedChange = null;

    //this.editor.setValue(BEGINNINGS[this.language]);

    this.editor.on('change', (change)=>{
      console.log('some changes: ' + JSON.stringify(change));
      if(this.editor.lastAppliedChange != change){
        this.collaboration.change(JSON.stringify(change));
      }
    });

    this.editor.session.selection.on("changeCursor", ()=>{
      let cursor = this.editor.selection.getCursor();
      //let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor: '+JSON.stringify(cursor));
      this.collaboration.changeCursor(JSON.stringify(cursor));
    });

    this.collaboration.loadCode();
  }

  test(): void{
    this.result = "Testing ..."
    //this.rbuild = "Testing"
    this.rrun = "Testing ..."
    console.log("uploading codes");
    let code = this.editor.getValue();
    let data = {
      "code": code,
      "language": this.language
    }

    //console.log()
    this.runTest.buildAndRun(data).subscribe(res=>{
      this.result = res["text"];
      this.rbuild = res["build"];
      this.rrun = res["run"];
    });
  }

  setLanguage(language): void{
    if(this.language!=language){
      this.language = language;
      this.resetCode();
    }
  }

  resetCode(): void{
    this.editor.setValue(BEGINNINGS[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

}
