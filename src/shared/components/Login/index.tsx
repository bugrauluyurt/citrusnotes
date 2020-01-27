import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { InputStyle } from 'styles/input';
import { ROUTE_REGISTER } from 'pages/Authentication/routes';

export const Login: React.FC<any> = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('invalid_email'))
                .required(t('required')),
            password: Yup.string()
                .min(6, t('min_password'))
                .max(30, t('max_password'))
                .required(t('required')),
        }),
        onSubmit: (values) => {
            console.log('Form value: ', values);
        },
    });

    return (
        <>
            <h1 className="text-gray-700 text-base font-bold text-center mb-4">{t('login')}</h1>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
            >
                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        {t('email')}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="email"
                        type="text"
                        placeholder={t('email')}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm pt-1">{formik.errors.email}</p>
                    ) : null}
                </div>
                {/* Password Field */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        {t('password')}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="password"
                        type="password"
                        placeholder="***************"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-sm pt-1">{formik.errors.password}</p>
                    ) : null}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button className="btn btn-primary-4 ripple" type="submit">
                        {t('sign_in')}
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer underline"
                        onClick={() => history.push(`${ROUTE_REGISTER}`)}
                    >
                        <span className="pr-1">{t('register')}</span>
                    </a>
                </div>
            </form>
        </>
    );
};
