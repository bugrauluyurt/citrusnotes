import { AxiosInstance, AxiosRequestConfig } from 'axios';
import _isObject from 'lodash/isObject';
import { LoggerService } from 'services/LoggerService';
import { IConnection } from 'services/connections/ConnectionInterface';

const axios = require('axios');

const AXIOS_BASE_CONFIG = {
    baseURL: process.env.API_URL || '/rest',
    headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig;

export enum RequestMethod {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
}

export class BaseConnection implements IConnection {
    private authorization: string | undefined;
    private connectionInstance: AxiosInstance;
    private defaultRequestConfig: AxiosRequestConfig = {};

    constructor(baseUrl?: string, authorization?: string, requestConfig?: AxiosRequestConfig) {
        const config = {
            ...AXIOS_BASE_CONFIG,
            ...requestConfig,
        };
        if (baseUrl) {
            config.baseURL = baseUrl;
        }
        this.authorization = authorization;
        if (this.authorization) {
            config.headers.Authorization = this.authorization;
        }
        this.defaultRequestConfig = config;
        this.connectionInstance = axios.create(config);
        this.setInterceptors();
    }

    getRequestConfig(): AxiosRequestConfig {
        return this.defaultRequestConfig;
    }

    private setInterceptors(): void {
        this.connectionInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                LoggerService.log(error, 'error');
                return Promise.reject(error);
            }
        );
    }

    private sanitizeParams(params?: any): any {
        if (!params || !_isObject(params)) {
            return {};
        }
        Object.keys(params).reduce((acc, paramKey) => {
            // @ts-ignore
            const value: any = params[paramKey];
            if (!value) {
                return acc;
            }
            return { ...acc, [paramKey]: value };
        }, {});
    }

    request(
        url: string,
        method: RequestMethod,
        params?: any,
        body?: any,
        requestConfig?: AxiosRequestConfig | object
    ): Promise<any> {
        const config = {
            url,
            method,
            params: this.sanitizeParams(params),
            ...this.defaultRequestConfig,
            ...requestConfig,
        } as AxiosRequestConfig;
        if (body) {
            const isFormData = body instanceof FormData;
            if (isFormData) {
                config.headers['Content-Type'] = 'multipart/form-data';
            }
            config.data = !isFormData && _isObject(body) ? JSON.stringify(body) : body || '';
        }
        return new Promise<any>((resolve) => {
            this.connectionInstance
                .request(config)
                .then((response) => resolve(response))
                .catch((error) => {
                    const errorObj = error instanceof Error ? error : new Error(error);
                    resolve(errorObj);
                });
        });
    }
}
