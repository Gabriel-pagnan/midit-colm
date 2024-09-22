import { Body, Controller, Post } from '@nestjs/common';
import { error } from 'console';

@Controller('logs')
export class LogController {
    @Post()
    logError(
        @Body() errorData: {
            error: string;
            stack: string;
        }
    ) {
        if (errorData) {
            error('Error received from frontend', errorData);

            return { message: 'Error logged successfully!'}
        }
    }
}
