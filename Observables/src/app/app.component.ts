import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private http: Http) {}
  //what is Reactive Programing?
  // what is data stream? marble diagram
  //Data streams can be created from many things:
  //waht is Observable?

  /*
   1. Observable vs Promise

   a.promise:
   ngOnInit(): void {
   let promise = new Promise(resolve => {
   console.log('promise execution");
   setTimeout(() => {
   resolve('okokok')
   }, 1000)
   });

   promise.then(value => console.log(value))
   ／／output: promise execution
   ／／okokok
   ／／promise 的第一个callback function resolve是立即执行的。一旦该函数代码执行到 resolve结束了，then第一个callback就会被调用。

   };
--------------------------------------
   b.observable:
   essential concepts: observable ,observable execution,observer, subscription
   pull & push
   how to create Observable from scratch
   a.ng new Observables 创建一个app.
   b. ng server 开启app服务
   ngOnInit(): void {
   let stream$ = new Observable(observable => { //$ means it is a data stream
   console.log('observable execution');
   setTimeout(() => {
   observer.next('observer next value') //vs resolve();
   }, 1000)
   })
   stream$.subscribe(value => console.log(value));
   };
   */
//---------------------------
 /* 2. why choose Observable over Promise?

  let stream$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    setTimeout(() => {
      observer.next('observer next value') ;//vs resolve();
    }, 1000)
  });
    observer.next(3);
  });

  stream$.subscribe(value => console.log(value));

  output: 1 2 3 observer next value
  so: (1) observable can return multiple values, synchronously or asynchronously;
      Promise can only return one single value;

      (2)observable can be cancelled, Promise cannot be canceled:

  ngOnInit() {
  let stream$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  let timeout = setTimeout(() => {
  observer.next('observer next value') ;//vs resolve();
  }, 1000);
  observer.next(3);

  return function unsubscribe(){ //该函数也可以直接写成匿名函数的形式，最终 subscribe 都会得到这个匿名函数
  clearTimeout(timeout);
  }

  });

  let subscriptionId = stream$.subscribe(observer => console.log(observer));

  setTimeout(()=> {
  subscriptionId.unsubscribe()
  }, 500)
  }


 3. Observable creation

   a: mannually: new Observable or Observable.create(..)
   b: creation operators: of, from. interval etc.

 4. observable subscription
  eg: let subscription = stream$.subscribe(observer => {..})
  传递到callback里的observer is an observable execution, a lazy computation that only happens
  for each Observer that subscribes.也就是每次程序到这里，就会去实例化instantiate一次该observable，
  有多少个observer，就有多少个instance of the observable。
  subscribe to an observable is like calling a observable function, providing callbacks where the data will be delievered to.

 5. There are 3 types of value that observable execution can deliver:
    next();
    error()
    complete();

  6. Observable execution disposal: 在observable中，通常有些代码执行的内容会占用一些系统资源， 如果你预测程序在未来不再使用这部分代码，
      那么你可以将这部分代码放在一个 function里return 出来，然后在subscription中清除。

   7.observer is just objects with 3 callbacks. one for each type of notification
      that observable may deliver:
      let observer = {
        next: value => console.log(value),
        error: error => console.log(error),
        complete: ()=> console.log('completed!) ／／observable里，一旦complete执行，后面的代码就不会被执行
      }

      stream$.subscribe(observer);

    All three types of callbacks maybe provided as arguments, just like Promise callbacks:
      stream$.subscribe(value => console.log(value),
                        error => console.log(error),
                        ()=> console.log('completed!);
  8 PULL & PUSH
  9. Subject observable的一种
      A subject is like an Observable . but can multicast to many Observables. Subjects
      are like eventEmitters: they maintain a registry of many listeners.
      Subject is multi-cast, observable is uni-cast;
      Subject 的subscribe只能接收订阅以后，subject发的内容

      let subject = new Subject();
      subject.subscribe(v => {console.log('A'+ v)});
      subject.next(1);
      subject.next(2)
      subject.subscribe(v => {console.log('B'+ v)});
      subject.next(3)
      output: A1 A2 A3 B3 //  Subject 的subscribe只能接收订阅以后，subject发的内容

   vs   let observanle = new Observable(observer=> {observer.next(1)});
      问题： 为什么subject可以直接call next();而observable要oberver去call next()?
          becasuse every subkect is an observable and observer.
      observable 和 subject 很大的一个不同：
      observable 一旦observer被调用，那么就会产生一个instancd of the observable.
      而subject,一旦有人subscribe,只是会将这个人 add to the registry list of listeners中而已。


    10. BehaciorSubject
      one of the variant of Subject. BehaviorSubject is useful for presenting "values overtime"


    11. create Observable from UI events & Array & Http request
      angular2中的http包，request返回的，默认的就是一个observable.

  */

 ngOnInit() {
   /*let stream$ = new Observable(observer => {
     observer.next(1);
     observer.next(2);
     let timeout = setTimeout(() => {
       observer.next('observer next value') ;//vs resolve();
     }, 1000);
     observer.next(3);

     return function unsubscribe(){
       clearTimeout(timeout);
     }

 });

  let subscriptionId = stream$.subscribe(value => console.log(value));

  setTimeout(()=> {
  subscriptionId.unsubscribe()
}, 500)*/

   this.getUser('Amber711')
     .subscribe((res: Response) => {
       console.log(res);
       console.log(res.json());
     });


 }

  getUser(username) {
    return this.http.get('https://api.github.com/users/' + username);
  }



}
