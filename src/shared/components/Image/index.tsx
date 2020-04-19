import React from 'react';
import { IImage } from 'components/Image/Image.module';

const Image = ({ url, className, onLoad }: IImage.IProps): JSX.Element => {
    return <img src={url} className={className} onLoad={onLoad} />;
};

export default Image;
