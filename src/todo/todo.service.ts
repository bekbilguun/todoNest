import {Injectable } from '@nestjs/common';
import { User } from 'src/users/users.service';


export class Todo {
  id: string;
  title: string;
  description: string;
  publish: string;
  userId: string;
};

@Injectable()
export class TodoService {
  private readonly todos=[];

  constructor() {
    this.todos = [
      {
        id: '11111111111111',
        title: 'admin',
        description: '1',
        publish: 'yes',
        userId: '1',
      },
      {
        id: '22222222222222',
        title: 'bilguun',
        description: '2',
        publish: "no",
        userId: "2",
      },      
      {
        id: '33333333333333',
        title: 'admin',
        description: '11',
        publish: 'yes1',
        userId: '1',
      },
      {
        id: '44444444444444',
        title: 'bilguun',
        description: '22222',
        publish: 'no222',
        userId: '2',
      },
    ];
  }

  async findOne(id: string): Promise<Todo | undefined> {
    return this.todos.find(todo => todo.id === id);
  }

  add(user: User, data: any){
    const todo = new Todo();
    todo.id = `${new Date().getTime()}`
    todo.title = data.title
    todo.description = data.description
    todo.publish = data.publish
    todo.userId = user.id
    this.todos.push(todo)
    return this.todos;
  }

  update(data: any){
    const todo = this.todos.find(todo => todo.id === data.id);
    if(todo){
      todo.title = data.title
      todo.description = data.description  
      todo.publish = data.publish
      return todo;
    }
    else{
      return {"message":"not found"}
    }
  }

  titleUpdate(data: any,filter: any){
    this.todos.forEach((todo, index) =>{
      var regexp = new RegExp(/(\d+)/g)
      if(regexp.test(todo.title)){
        todo.publish = "no"
      }
  });
    return this.todos;
  }

  delete(data: any){
    this.todos.forEach((todo, index) =>{
      if(todo.id === data.id) this.todos.splice(index,1);
    });
    return this.todos;
  }

  deleteUnpublish(data: any){
    for (var i = this.todos.length - 1; i >= 0; i--) {
      if (this.todos[i].publish === "no" || this.todos[i].publish === "no") { 
        this.todos.splice(i, 1);
      }}
    return this.todos;

  }

  sentTitle(data: any){
    this.todos.forEach((todo, index) =>{
      this.todos.push(todo)
    })
  }

  list(user: User, filter: any){
  let filtered = this.todos;
  if(user.username !== 'admin'){
    filtered = filtered.filter(todo => {
      return todo.userId === user.id
    });
  }

  if(filter.title){
    filtered = filtered.filter(todo => {
      return todo.title.indexOf(filter.title) !== -1
    });
  }

  if(filter.description){
    filtered = filtered.filter(todo => {
      return todo.description.indexOf(filter.description) !== -1
    });
  }

  if(filter.publish){
    filtered = filtered.filter(todo => {
      return todo.publish.indexOf(filter.publish) !== -1
    });
  }
  return filtered;
}

}