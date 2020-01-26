import React from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styles from './Authentication.module.css';

const Authentication: React.FC<any> = () => {
    const { t } = useTranslation();
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
        <React.Fragment>
            <div className="authentication-component">
                <div className={styles.authenticationComponentInner}>
                    <div className={styles.authenticationBox}>
                        <div className="w-full">
                            <form
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className={classNames(
                                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                                            {
                                                'border-red-500':
                                                    formik.touched.email && formik.errors.email,
                                            }
                                        )}
                                        id="email"
                                        type="text"
                                        placeholder={t('username')}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <p className="text-red-500 text-xs pt-1">
                                            {formik.errors.email}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className={classNames(
                                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                                            {
                                                'border-red-500':
                                                    formik.touched.password &&
                                                    formik.errors.password,
                                            }
                                        )}
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <p className="text-red-500 text-xs pt-1">
                                            {formik.errors.password}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                    <a
                                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>
                            <p className="text-center text-gray-500 text-xs">
                                &copy;2020 CitrusNotes. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Authentication;
