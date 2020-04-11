export interface UseWindowSizeHook {
    windowSize: number[] | undefined[];
    isPhone: boolean;
    isTabletPortraitUp: boolean;
    isTabletLandscapeUp: boolean;
    isDesktopUp: boolean;
    isBigDesktopUp: boolean;
}
