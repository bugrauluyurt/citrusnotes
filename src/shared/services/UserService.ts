import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'store/user/types';

export class UserService {
    static fetchUser(userId: string): Observable<User> {
        const mockUser = {
            id: userId,
            name: 'Bugra',
            email: 'myemail@gmail.com',
        } as User;
        return of(mockUser).pipe(delay(1000));
    }
}
