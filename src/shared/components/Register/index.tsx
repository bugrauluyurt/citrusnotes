import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputStyle } from 'styles/input';
import { ROUTE_LOGIN } from 'pages/Authentication/routes';

export const Register = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, t('min_username'))
                .max(100, t('max_username'))
                .required(t('required')),
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
            <h1 className="text-gray-700 text-base font-bold text-center mb-4">{t('register')}</h1>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
            >
                {/* Name Field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        {t('username')}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="username"
                        type="text"
                        placeholder={t('username')}
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <p className="text-red-500 text-xs pt-1">{formik.errors.username}</p>
                    ) : null}
                </div>
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
                        <p className="text-red-500 text-xs pt-1">{formik.errors.email}</p>
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
                        <p className="text-red-500 text-xs pt-1">{formik.errors.password}</p>
                    ) : null}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {t('register')}
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer underline"
                        onClick={() => history.push(`${ROUTE_LOGIN}`)}
                    >
                        <span className="pr-1">{t('sign_in')}</span>
                    </a>
                </div>
            </form>
        </>
    );
};
