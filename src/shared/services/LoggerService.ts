export type LogTypes = 'error' | 'normal';

export class LoggerService {
    static readonly ERROR_PREFIX: string = 'ERROR: \n';
    static logFn(log: any, type: LogTypes): void {
        switch (type) {
            case 'normal':
                return console.log(log);
            case 'error':
                return console.error(LoggerService.ERROR_PREFIX, log);
        }
    }
    static log(log: any, type: LogTypes = 'normal'): void {
        LoggerService.logFn(log, type);
    }
}
