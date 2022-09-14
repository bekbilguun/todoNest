import { Controller, Get, Request, Post, UseGuards, Query, SetMetadata, Req } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/entities/role.enum';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from './roles.decorator';
import { UsersService } from  './users.service';


@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('users/great')
  @Roles(Role.USER)
  async great(@Request() req) {
    return this.usersService.create(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/users/add')
  @Roles(Role.ADMIN)
  async add(@Request() req) {
    return this.usersService.add(req.body);
  }

  @UseGuards(JwtAuthGuard, AuthenticatedGuard, RolesGuard)
  @Get('users/list')
  @Roles(Role.ADMIN)
  usersList(@Request() request, @Query() query) {
    return this.usersService.list(query);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('users/update')
  update(@Request() req) {
    return this.usersService.update(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/delete')
  delete(@Request() req) {
    return this.usersService.delete(req.body);
  }
}
