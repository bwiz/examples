import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo } from '../models/to-do';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos = new BehaviorSubject<ToDo[]>([]);

  public todos$ = this._todos.asObservable();

  constructor() {
    // Initial state
    this._todos.next([
      new ToDo('clean the house'),
      new ToDo('buy milk')
    ]);
  }

  public addTodo(input: string) {
    if (input === '') {
      return;
    }
    this._todos.next([...this._todos.value, new ToDo(input)]);
  }

  // Should be observable
  public async deleteTodo(i: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const todos = this._todos.value;
        todos.splice(i, 1);

        this._todos.next(todos);

        resolve(true);
      }, 5000);
    });
  }

  public shuffle() {
    const todos = this._todos.value;

    todos.forEach(todo => {
      todo.Item = todo.Item.split('').sort(() => {
        return 0.5 - Math.random();
      }).join('');
    });

    this._todos.next(todos);
  }
}
