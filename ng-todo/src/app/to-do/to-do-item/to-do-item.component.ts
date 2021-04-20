import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ToDo } from '../../models/to-do';

@Component({
  selector: 'ToDoItem', //default: app-to-do-item
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css'],
})
export class ToDoItemComponent {

  @Input() ToDo: ToDo = new ToDo('');
  @Input() index: number;

  deleteInProgress = false;

  constructor(private todoService: TodoService) {}

  async deleteItem() {
    this.deleteInProgress = true;

    const result = await this.todoService.deleteTodo(this.index);

    if (result) {
      this.deleteInProgress = false;
    }
  }
}
