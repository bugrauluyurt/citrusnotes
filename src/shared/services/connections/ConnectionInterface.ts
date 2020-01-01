import { AxiosRequestConfig } from 'axios';
import { RequestMethod } from 'services/connections/ConnectionBase';

export declare interface IConnection {
    request(
        url: string,
        method: RequestMethod,
        params?: any,
        body?: any,
        requestConfig?: AxiosRequestConfig
    ): Promise<any>;
}
