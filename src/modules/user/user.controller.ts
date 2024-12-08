import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @Get('getUser')
  findOne(@Body() email: string) {
    return this.userService.findOneUser(email);
  }

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @ApiCookieAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('getUser/:id')
  findOneUserById(@Param('id') id: string) {
    return this.userService.findOneUserById(id);
  }
}
