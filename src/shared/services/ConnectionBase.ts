import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoggerService } from 'services/LoggerService';

const axios = require('axios');

const AXIOS_BASE_CONFIG = {
    baseUrl: process.env.API_URL || '/',
    headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig;

export class BaseConnection {
    private authorization: string | undefined;
    private connectionInstance: AxiosInstance;

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
        this.connectionInstance = axios.create(config);
        this.setInterceptors();
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
        if (!params) {
            return {};
        }
        Object.keys(params).reduce((acc, paramKey) => {
            const value = params[paramKey];
            if (!value) {
                return acc;
            }
            return { ...acc, [paramKey]: value };
        }, {});
    }

    get(url: string, params?: any, requestConfig?: AxiosRequestConfig): Promise<any> {
        return this.connectionInstance.get(url, {
            params: this.sanitizeParams(params),
            ...requestConfig,
        });
    }

    post(url: string, params?: any, body?: any, requestConfig?: AxiosRequestConfig): Promise<any> {
        return this.connectionInstance.post(url, {
            params: this.sanitizeParams(params),
            data: body,
            ...requestConfig,
        });
    }
}
