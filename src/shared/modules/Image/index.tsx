import React from 'react';
import { IImage } from './Image.module';

const Image = ({ url, className, onLoad }: IImage.IProps): JSX.Element => {
    return <img src={url} className={className} onLoad={onLoad} />;
};

export default Image;
