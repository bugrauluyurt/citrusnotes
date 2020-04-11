import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { isUserAnonymous } from 'store/user/selectors';

// Use this hook as a component level authGuard
export const useAuthGuard = () => {
    const history = useHistory();
    const isAnonymous = useSelector(isUserAnonymous);
    const [isAuthGuardLoading, setIsAuthGuardLoading] = useState(true);
    useEffect(() => {
        if (isAnonymous) {
            history.push('/authentication');
        }
        setIsAuthGuardLoading(isAnonymous);
    }, [isAnonymous]);
    return isAuthGuardLoading;
};
