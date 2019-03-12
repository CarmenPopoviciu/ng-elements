
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyTodo } from './my-todo.component';
import { TodoInput } from './todo-input.component';
import { TodoItem } from './todo-item.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [MyTodo, TodoInput, TodoItem],
  entryComponents: [MyTodo],
})
export class TodoModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() { 
  //  const todosEl = createCustomElement(MyTodo, {
  //     injector: this.injector
  //   });

  //   customElements.define('my-todos', todosEl);
  }
}
