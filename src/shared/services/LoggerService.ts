export type LogTypes = 'error' | 'normal';

export class LoggerService {
    static readonly ERROR_PREFIX: string = '[LOGGER] ERROR: \n';
    static logFn(log: any, type: LogTypes): void {
        switch (type) {
            case 'normal':
                return console.log(`[LOGGER] ${log}`);
            case 'error':
                return console.error(LoggerService.ERROR_PREFIX, log);
        }
    }
    static log(log: any, type: LogTypes = 'normal', bypassEnvCheck: boolean = false): void {
        if (process.env.NODE_ENV === 'production' && !bypassEnvCheck) {
            return;
        }
        LoggerService.logFn(log, type);
    }
}
