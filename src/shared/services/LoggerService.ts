export class LoggerService {
    static readonly ERROR_PREFIX: string = 'ERROR: \n';
    static log(error: any): void {
        console.log(LoggerService.ERROR_PREFIX, error);
    }
}
