import { CSSProperties } from 'react';

declare namespace IImage {
    export interface IProps {
        onLoad?: () => void;
        url: string;
        className?: string;
    }
}

export { IImage };
