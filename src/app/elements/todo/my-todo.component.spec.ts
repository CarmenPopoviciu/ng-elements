import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTodo } from './my-todo.component';

describe('NnTodoComponent', () => {
  let component: MyTodo;
  let fixture: ComponentFixture<MyTodo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTodo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
