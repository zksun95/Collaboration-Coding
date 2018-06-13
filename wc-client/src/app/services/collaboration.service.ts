import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaboration_socket: any;

  userCursors: Object = {};
  cursorNum: number = 0;

  constructor() { }

  init(sessionId: string, editor: any): void{
    this.collaboration_socket = io(window.location.origin, { query: 'sessionId='+sessionId});

    this.collaboration_socket.on("change", (change: string)=>{
      console.log("changes: " + change);
      change = JSON.parse(change);
      editor.lastAppliedChange = change;
      editor.getSession().getDocument().applyDeltas([change]);
    })

    // this.collaboration_socket.on("currentUsers", (users: string)=>{
    //   console.log("users: " + users);
    //   // change = JSON.parse(change);
    //   // editor.lastAppliedChange = change;
    //   // editor.getSession().getDocument().applyDeltas([change]);
    // })

    this.collaboration_socket.on("changeCursor", (cursor: string)=>{
      console.log("cursor: " + cursor);
      let session = editor.getSession();

      //let colors = COLORS; //using pop and push to manage the colors, have to get the css color after dis connect and push it back;

      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let cursorId = cursor["cursorId"];
      //console.log(cursorId);

      if(cursorId in this.userCursors){
        //console.log("try remove");
        session.removeMarker(this.userCursors[cursorId]['marker']);
      }else{
        //console.log("try add");
        this.userCursors[cursorId] = {};

        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_"+cursorId+
                        "{position: absolute; background:"+COLORS[this.cursorNum]+";"+
                        "z-index: 100; width:3px !important;}";
        document.body.appendChild(css);
        this.cursorNum++;
      }

      let Range = ace.require("ace/range").Range;
      let newMarker = session.addMarker(new Range(x, y, x, y+1), "editor_cursor_"+cursorId, true);
      this.userCursors[cursorId]['marker'] = newMarker;
    });

    this.collaboration_socket.on("deleteCursor", (sid: string)=>{
      // console.log("delete: " + sid);
      // console.log(this.userCursors);
      // console.log(this.userCursors[sid]);
      editor.getSession().removeMarker(this.userCursors[sid]['marker']);
      // change = JSON.parse(change);
      // editor.lastAppliedChange = change;
      // editor.getSession().getDocument().applyDeltas([change]);
    })
  }

  change(change: string): void{
    this.collaboration_socket.emit("change", change);
  }
  
  changeCursor(cursor: string): void{
    //console.log("emitted cursor");
    this.collaboration_socket.emit("changeCursor", cursor);
  }

  loadCode(): void{
    console.log("Loading code...");
    this.collaboration_socket.emit("loadCode");
  }
}
