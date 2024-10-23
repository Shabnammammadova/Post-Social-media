import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name required'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Surname required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirm password required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required")
});

const Register = () => {
    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-2 space-y-2 md:space-y-4 sm:p-8">
                        <Formik
                            initialValues={{ name: '', surname: '', email: '', password: '', confirmPassword: '', terms: false }}
                            validationSchema={RegisterSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                console.log(values);
                                setSubmitting(false)
                                const response = await register(values)
                                console.log(response);

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
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name} required />
                                        <div className='text-red-600 h-6 text-sm'>{(errors.name && touched.name) ? errors.name : ""}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                                        <input name="surname" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.surname} required />
                                        <div className='text-red-600 h-6 text-sm'>{(errors.surname && touched.surname) ? errors.surname : ""}</div>
                                    </div>
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
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword} required />
                                        <div className='text-red-600 h-6 text-sm'>{(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ""}</div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" name='terms' aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" onChange={handleChange}
                                                onBlur={handleBlur}
                                                checked={values.terms} required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className={`font-light ${errors.terms && touched.terms ? "text-red-600" : "text-gray-500"} `}>I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-dark-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?
                                        <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Login here
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

export default Register