import { LoginParams, RegisterParams, User } from 'store/user/types';
import ConnectionFactory from 'services/connections/ConnectionFactory';
import { RequestMethod } from 'services/connections/ConnectionBase';
import { IConnection } from 'services/connections/ConnectionInterface';

class UserService {
    private connection: IConnection = ConnectionFactory.create();

    fetchUser(userId: string): Promise<User> {
        return this.connection.request('user', RequestMethod.GET, { userId });
    }

    loginUser(params: LoginParams): Promise<User> {
        return this.connection.request('auth/local/login', RequestMethod.POST, undefined, params);
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
