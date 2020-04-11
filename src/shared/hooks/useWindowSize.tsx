import { useEffect, useState } from 'react';
import { UseWindowSizeHook } from 'hooks/types';
import {
    isBigDesktopUp,
    isDesktopUp,
    isPhone,
    isTabletLandscapeUp,
    isTabletPortraitUp,
} from 'utils/utilsBreakPoints';

const getSize = __BROWSER__
    ? () => [window.innerWidth, window.innerHeight]
    : () => [undefined, undefined];

export const useWindowSize = (shouldListenWindowSize: boolean = false): UseWindowSizeHook => {
    const [windowSize, setWindowSize] = useState(getSize());

    useEffect(() => {
        if (!__BROWSER__) {
            return;
        }
        const handleResize = () => {
            setWindowSize(getSize());
        };
        if (shouldListenWindowSize) {
            window.addEventListener('resize', handleResize);
        }
        return () =>
            shouldListenWindowSize ? window.removeEventListener('resize', handleResize) : undefined;
    }, [shouldListenWindowSize]);

    return {
        windowSize,
        isPhone: isPhone(windowSize[0]),
        isTabletPortraitUp: isTabletPortraitUp(windowSize[0]),
        isTabletLandscapeUp: isTabletLandscapeUp(windowSize[0]),
        isDesktopUp: isDesktopUp(windowSize[0]),
        isBigDesktopUp: isBigDesktopUp(windowSize[0]),
    };
};
