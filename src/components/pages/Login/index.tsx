import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../../services/auth';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password required"),
});

const Login = () => {
    return (
        <section className='flex items-center justify-center mx-auto'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[400px] md:h-screen lg:py-0">
                <a href="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Autentication
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <Formik
                            initialValues={{ name: '', surname: '', email: '', password: '', confirmPassword: '', terms: false }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                const response = await login(values)
                                console.log(response);
                                setSubmitting(false)

                            }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            }) => (
                                <form className="space-y-2 md:space-y-3" action="#" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email} required />
                                        <div className='text-red-600 h-6 text-sm'>{(errors.email && touched.email) ? errors.email : ""}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password} required />
                                        <div className='text-red-600 h-6 text-sm'>{(errors.password && touched.password) ? errors.password : ""}</div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-dark-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?
                                        <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Register
                                        </Link>
                                    </p>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login