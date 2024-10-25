import { Formik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../../services/auth';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
});

const ForgotPassword = () => {
    return (
        <section className='flex items-center justify-center mx-auto'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[400px] md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
                            Reset Password
                        </h1>
                        <p>Enter your email address.</p>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
                                try {
                                    const response = await forgotPassword(values);
                                    setStatus({ success: true, message: "Email sent! Check your inbox." });
                                    console.log(response);
                                } catch (error) {
                                    console.error(error);
                                    setErrors({ email: error.message });
                                    setStatus({ success: false, message: error.message });
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                status,
                            }) => (
                                <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="johndoe@gmail.com"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            required
                                        />
                                        {errors.email && touched.email && <div className='text-red-600 h-6 text-sm'>{errors.email}</div>}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <button type="submit" className="text-white bg-dark-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue</button>
                                        <button type="button" className="text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                                    </div>

                                    {status && status.message && (
                                        <div className={status.success ? "text-green-600" : "text-red-600"}>
                                            {status.message}
                                        </div>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;

