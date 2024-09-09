import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLoginDTO } from './dtos/return-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { };

    @Post()
    async login(@Body() data: LoginDTO): Promise<ReturnLoginDTO> {
        if (data) {
            return this.authService.login(data);
        }
    }
}
