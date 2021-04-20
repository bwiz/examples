import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'ToDo', // default:'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {

  constructor(public todoService: TodoService) {}

  Input = '';
  loading = false;
  Submitted = false;

  ngOnInit() {}

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
