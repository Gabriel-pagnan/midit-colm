import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLoginDTO } from './dtos/return-login.dto';
import { validatePassword } from '../helper/password';
import { ReturnUserDTO } from '../user/dtos/return-user.dto';
import { LoginPayload } from './dtos/payload-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(login: LoginDTO): Promise<ReturnLoginDTO> {
        try {
            const user = await this.userService.findUserByEmail(login.email)
                .catch(() => undefined);

            const isMatch = await validatePassword(login.password, user?.password || '');
            if (!isMatch || !user) {
                throw new BadRequestException('E-mail ou senha inválidos');
            }

            return {
                access_token: this.jwtService.sign({ ...new LoginPayload(user) }),
                user: new ReturnUserDTO(user)
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
