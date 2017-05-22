import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;

  clientsInfo: Object = {};
  clientNum: number = 0;

  constructor() { }

  init(editor: any,sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query:'sessionId=' + sessionId });

    //collaborationSocket listens on the change from the server
    //delta includes only the change, instead of the whole code snippet from user.
    this.collaborationSocket.on('change',(delta: string) => {
      console.log('collaboration: editor change by' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });


    this.collaborationSocket.on('cursorMove', cursor => {
      console.log('cursor move:', cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let changeClientId = cursor['socketId'];
      console.log('x:',x,'y:',y,'changeClientId:',changeClientId);
      if(changeClientId in this.clientsInfo ) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker'])
      } else {
        this.clientsInfo[changeClientId] = {};
        let css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = `.editor_cursor_${changeClientId} { 
            position: absolute;
            background: ${COLORS[this.clientNum]};
            z-index: 100;
            width: 3px !important;
        }`
      }
    });

    this.collaborationSocket.on('message', (message)=> {
      console.log(message);
    })
  }



   //change from client side
  change(delta: string): void {
    this.collaborationSocket.emit("change", delta)
  }

  cursorMove(cursor: string): void {
    this.collaborationSocket.emit('cursorMove', cursor)
  }
}
