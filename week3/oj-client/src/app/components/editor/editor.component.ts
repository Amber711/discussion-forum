import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

declare var ace: any;
declare var io: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;


  public languages: string[] = ['Java', 'C++', 'Python', 'Javascript'];

  language: string = 'Java';

  sessionId: string;

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
          // Type your Java code here
      }
}`,
    'C++': `#include <iostream>
    using namespace std;
    int main() {
       // Type your C++ code here
       return 0;
}`,
    'Python': `class Solution:
        def example():
            # Write your Python code here`
  };


  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });

  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/textmate');
    //this.editor.getSession().setMode('ace/mode/java');
    //this.editor.setValue(this.defaultContent['Java']);
    this.resetEditor();
    document.getElementsByTagName('textarea')[0].focus();


    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    this.editor.$blockScrolling = Infinity;

    this.editor.on('change', e => {
      console.log('editor changes:' + JSON.stringify(e));
      if(this.editor.lastAppliedChange != e) { //防止因为网络等其他原因，造成两次发送相同的一次修改
        this.collaboration.change(JSON.stringify(e))
      }
    })

  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/'+this.language.toLocaleLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.$blockScrolling = Infinity;
  }

  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);

  }
}
