import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Catch()
export class ErrorFilter implements ExceptionFilter {

    constructor() {
        this.createProcessEvent();
    }

    public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
        throw 'Error occurred during message catch';
    }

    public handleUnknownError(exception: any, status: string): Observable<never> {
        throw new Error('Method not implemented.');
    }

    public isError(exception: any): exception is Error {
        throw new Error('Method not implemented.');
    }

    public createProcessEvent(): void {
        process.on('uncaughtException', (error: Error) => {
            Logger.error(
                `Uncaught Exception Error: ${error.message}\n${error.stack}`,
                'AllExceptionsFilter',
            );
        });
        process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
            Logger.error(
                `Unhandled Rejection Error: ${reason}\n${reason.stack}`,
                'AllExceptionsFilter',
            );
        });

    }
}


