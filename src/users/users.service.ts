import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { Role } from 'src/entities/role.enum';

// This should be a real class/interface representing a user entity
export class User{
  id: string;
  username: string;
  password: string;
  role: string;
};

@Injectable()
export class UsersService {
  private readonly users =[];

  constructor(){
    this.users = [
      {
        id: '1',
        username: 'admin',
        password: '0000',
        role: 'admin'
      },
      {
        id: "2",
        username: 'bilguun',
        password: '0000',
        role: 'user'
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  create(data: any){
    const user = new User();
    user.id = `${new Date().getTime()}`
    user.username = data.username
    user.password = data.password
    user.role = 'user'
    this.users.push(user)
    return this.users;
  }

  add(data: any){
    const user = new User();
    user.id = `${new Date().getTime()}`
    user.username = data.username
    user.password = data.password
    user.role = data.role
    this.users.push(user)
    return this.users;
  }

  update(data: any){
    const user = this.users.find(user => user.id === data.id);
    if(user){
      user.username = data.username
      user.password = data.password
      return user;
    }
    else{
      return {"message":"not found"}
    }
  }

  delete(data: any){
    this.users.forEach((user, index) =>{
      if(user.id === data.id) this.users.splice(index,1);
    });
    return this.users;
  }

  list(filter: any){
    let filtered = this.users;
    if(filter.id){
      filtered = filtered.filter(user => {
        return user.id.indexOf(filter.id) !== -1
      });
    }
    if(filter.username){
      filtered = filtered.filter(user => {
        return user.username.indexOf(filter.username) !== -1
      });
    }
    return filtered;
  }
}