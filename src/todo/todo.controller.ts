import { Controller, Get, Request, Post, UseGuards, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { TodoService } from  './todo.service';
@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('todo/add')
  @Roles(Role.ADMIN)
  async add(@Request() req) {
    console.log(req.user,'=================req.user---')
    return this.todoService.add(req.user, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('todo/list')
  list(@Request() req, @Query() query) {
    return this.todoService.list(req.user, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todo/detail/:id')
  detail(@Param("id") id: string) {
    return this.todoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todo/update')
  update(@Request() req) {
    return this.todoService.update(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todo/delete')
  delete(@Request() req) {
    
    return this.todoService.delete(req.body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('todo/delete/unpublish')
  deleteUnpublish(@Request() req) {
    return this.todoService.deleteUnpublish(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todo/title/update')
  titleUpdate(@Request() req) {
    return this.todoService.titleUpdate(req.body, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todo/sent/title')
  sentTitle(@Request() req, @Query() query) {
    return this.todoService.list(req.user, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todo/data/list')
  dataList(@Request() req, @Query() query){
    return this.todoService.list(req.user, query);
  }
}
