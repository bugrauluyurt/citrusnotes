import ConnectionFactory from 'services/connections/ConnectionFactory';
import { RequestMethod } from 'services/connections/ConnectionBase';
import { IProject } from 'types/Project';
import { IConnection } from 'services/connections/Connection';

class ProjectsService {
    private connection: IConnection = ConnectionFactory.create();

    getProjects(companyId: number, rejectionDisabled: boolean = false): Promise<IProject[]> {
        return this.connection.request(
            'projects',
            RequestMethod.GET,
            undefined,
            { companyId },
            undefined,
            rejectionDisabled
        );
    }
}

export default new ProjectsService();
