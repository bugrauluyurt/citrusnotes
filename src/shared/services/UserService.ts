import { AxiosRequestConfig } from 'axios';
import { LoginParams, RegisterParams, User } from 'store/user/types';
import ConnectionFactory from 'services/connections/ConnectionFactory';
import { RequestMethod } from 'services/connections/ConnectionBase';
import { IConnection } from 'services/connections/ConnectionInterface';

class UserService {
    private connection: IConnection = ConnectionFactory.create();

    getRequestConfig(): AxiosRequestConfig {
        return this.connection.getRequestConfig();
    }

    getUser(requestConfig?: AxiosRequestConfig | object): Promise<User> {
        return this.connection.request(
            'users/currentUser',
            RequestMethod.GET,
            undefined,
            undefined,
            requestConfig
        );
    }

    getUserById(userId: string): Promise<User> {
        return this.connection.request(`users/${userId}`, RequestMethod.GET);
    }

    loginUser(params: LoginParams): Promise<User> {
        return this.connection.request('auth/local/login', RequestMethod.POST, undefined, params);
    }

    logoutUser(): Promise<void> {
        return this.connection.request('auth/local/logout', RequestMethod.POST);
    }

    registerUser(params: RegisterParams): Promise<User> {
        return this.connection.request(
            'auth/local/register',
            RequestMethod.POST,
            undefined,
            params
        );
    }
}

export default new UserService();
