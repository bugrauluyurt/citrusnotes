import { IConnection } from 'services/connections/ConnectionInterface';
import { BaseConnection } from './ConnectionBase';
import { ConnectionTypes } from './ConnectionTypes';

class ConnectionFactory {
    create(connectionType: ConnectionTypes): IConnection {
        switch (connectionType) {
            case ConnectionTypes.BASE_CONNECTION:
                return new BaseConnection();
            // Other connection cases can be written here
        }
        return new BaseConnection();
    }
}
const connectionFactory = new ConnectionFactory();
export default connectionFactory;
