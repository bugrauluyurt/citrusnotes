import { useEffect, useState } from 'react';
import _clone from 'lodash/clone';
import { IUseWindowSizeHook, IWindowSize } from 'hooks/useWindowSize.d';
import {
    isBigDesktopUp,
    isDesktopUp,
    isPhone,
    isTabletLandscapeUp,
    isTabletPortraitUp,
} from 'utils/utilsBreakPoints';

class WindowSizeDetail {
    windowSize: number[] = [0, 0];
    isPhone: boolean = false;
    isTabletPortraitUp: boolean = false;
    isTabletLandscapeUp: boolean = false;
    isDesktopUp: boolean = false;
    isBigDesktopUp: boolean = false;
    constructor(windowSize: number[]) {
        this.windowSize = windowSize;
        this.isPhone = isPhone(windowSize[0]);
        this.isTabletPortraitUp = isTabletPortraitUp(windowSize[0]);
        this.isTabletLandscapeUp = isTabletLandscapeUp(windowSize[0]);
        this.isDesktopUp = isDesktopUp(windowSize[0]);
        this.isBigDesktopUp = isBigDesktopUp(windowSize[0]);
    }
}

const getSize = __BROWSER__ ? () => [window.innerWidth, window.innerHeight] : () => [0, 0];

export const useWindowSize = (shouldListenWindowSize: boolean = false): IUseWindowSizeHook => {
    const [windowSize, setWindowSize] = useState({
        current: getSize(),
        previous: [0, 0],
    } as IWindowSize);

    useEffect(() => {
        if (!__BROWSER__) {
            return;
        }
        const handleResize = () => {
            setWindowSize((prevState: IWindowSize) => ({
                current: getSize(),
                previous: _clone(prevState.current),
            }));
        };
        if (shouldListenWindowSize) {
            window.addEventListener('resize', handleResize);
        }
        return () =>
            shouldListenWindowSize ? window.removeEventListener('resize', handleResize) : undefined;
    }, [shouldListenWindowSize]);

    return {
        current: new WindowSizeDetail(windowSize.current),
        previous: new WindowSizeDetail(windowSize.previous),
    };
};
