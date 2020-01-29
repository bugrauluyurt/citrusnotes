import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ErrorProps {
    errorMessage: string;
}
export const Error: React.FC<ErrorProps> = ({ errorMessage }: ErrorProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="text-center py-4 lg:px-4">
                <div
                    className="p-3 bg-red-100 items-center text-indigo-100 leading-none rounded flex lg:inline-flex"
                    role="alert"
                >
                    <span className="flex rounded bg-red-700 uppercase px-2 py-1 text-xs font-bold mr-3">
                        {t('error')}
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto text-red-700 leading-snug">
                        {errorMessage}
                    </span>
                </div>
            </div>
        </>
    );
};
