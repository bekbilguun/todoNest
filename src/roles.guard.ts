import { Injectable, CanActivate, ExecutionContext, Req, Body } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./entities/role.enum";
import { User, UsersService} from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
       const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
       ]);
        console.log(requiredRoles,'-------------------------------requireRoles')
       if(!requiredRoles){
        return true;
       }
        const user = context.switchToHttp().getRequest().user;
        console.log(user, '===============================userrole========================')

        // const result = requiredRoles.some((role) => user.role === role);
        // console.log(result,'____________________________________result')
        // return result;
        return true;
    }
}