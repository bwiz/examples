import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _counter = new BehaviorSubject<number>(0);

  public counter$ = this._counter.asObservable();

  constructor() { }

  public updateCounter(val: number): void {
    this._counter.next(this._counter.value + 1);
  }
}
