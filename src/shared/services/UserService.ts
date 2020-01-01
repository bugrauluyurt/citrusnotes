import { User } from 'store/user/types';
import ConnectionFactory from 'services/connections/ConnectionFactory';
import { RequestMethod } from 'services/connections/ConnectionBase';
import { IConnection } from 'services/connections/ConnectionInterface';

class UserService {
    private connection: IConnection = ConnectionFactory.create();
    fetchUser(userId: string): Promise<User> {
        return this.connection.request('user', RequestMethod.GET, { userId });
    }
}

export default new UserService();
