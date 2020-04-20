import { AxiosRequestConfig } from 'axios';
import { LoginParams, RegisterParams, User } from 'store/user/types';
import ConnectionFactory from 'services/connections/ConnectionFactory';
import { RequestMethod } from 'services/connections/ConnectionBase';
import { IConnection } from 'services/connections/Connection';

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
            requestConfig,
            true
        );
    }

    getUserById(userId: string): Promise<User> {
        return this.connection.request(
            `users/${userId}`,
            RequestMethod.GET,
            undefined,
            undefined,
            undefined,
            true
        );
    }

    loginUser(body: LoginParams): Promise<User> {
        return this.connection.request(
            'auth/local/login',
            RequestMethod.POST,
            undefined,
            body,
            undefined,
            true
        );
    }

    logoutUser(): Promise<void> {
        return this.connection.request(
            'auth/local/logout',
            RequestMethod.POST,
            undefined,
            undefined,
            undefined,
            true
        );
    }

    registerUser(body: RegisterParams): Promise<User> {
        return this.connection.request(
            'auth/local/register',
            RequestMethod.POST,
            undefined,
            body,
            undefined,
            true
        );
    }
}

export default new UserService();
