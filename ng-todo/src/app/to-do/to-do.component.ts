import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'ToDo', // default:'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit, OnDestroy {

  constructor(public todoService: TodoService, public loggerService: LoggerService) {}

  Input = '';
  loading = false;
  Submitted = false;
  counter = 0;

  loggerServiceSubscription: Subscription;

  ngOnInit() {
    // This is needed only because 0 is in JS equal to false and the subscription cannot be used in template
    this.loggerServiceSubscription = this.loggerService.counter$
    .subscribe((num: number) => {
      this.counter = num;
    });
  }

  ngOnDestroy() {
    this.loggerServiceSubscription.unsubscribe();
  }

  addItem() {
    this.Submitted = true;
    if (this.Input === '') {
      return;
    }
    this.todoService.addTodo(this.Input);
  }

  shuffle() {
    this.todoService.shuffle();
  }

  ShouldBeHidden(
    Valid: boolean,
    Pristine: boolean,
    Submitted: boolean
  ): boolean {
    if (Submitted) {
      return Valid;
    } else {
      return Valid || Pristine;
    }
  }
}
