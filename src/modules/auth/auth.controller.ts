import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Response as Res } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) {}

  //@Method POST
  //@desc Login user
  //@Path: /login
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Logged Successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User Logged Failed.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() loginUserDto: LoginUserDto,
    @Response() res: Res,
  ) {
    try {
      const loginResult = await this.authService.login(req.user, loginUserDto);

      // Set the httpOnly cookie for 4 hours
      res.cookie('token', loginResult.success.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
        maxAge: 14400000, // 4 hours in milliseconds
      });

      // Send response
      res.status(HttpStatus.OK).json({
        success: {
          name: loginResult.success.name,
          token: loginResult.success.token,
        },
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during login',
        error: error.message,
      });
    }
  }

  //@Method POST
  //@desc Register user
  //@Path: /register
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register User Successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Register User Failed.',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  //@Method GET
  //@desc Get Current User
  //@Path: /current
  @ApiOperation({ summary: 'Current user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Current User Successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Current User Failed.',
  })
  @ApiCookieAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('current')
  async current(@Request() req: any) {
    const token = req.cookies['token'];
    return {
      status: 200,
      success: {
        token: token,
      },
    };
  }

  //@Method POST
  //@desc Logout from my account
  //@Path: /logout
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Logout User Successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Logout User Failed.',
  })
  @Post('logout')
  async logout(@Response() res: Res) {
    res.clearCookie('token');
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged Out',
    });
  }
}
