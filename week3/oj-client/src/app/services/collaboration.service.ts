import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;
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



    this.collaborationSocket.on('message', (message)=> {
      console.log(message);
    })
  }


   //change from client side
  change(delta: string): void {
    this.collaborationSocket.emit("change", delta)
  }
}
