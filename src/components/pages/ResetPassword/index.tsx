// import { useParams } from 'react-router-dom';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { resetPassword } from '../../../services/auth';


// const ResetPasswordSchema = Yup.object().shape({
//     password: Yup.string().min(8, 'Şifre en az 8 karakter olmalıdır').required('Şifre gerekli'),
//     confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
//         .required('Şifre onayı gerekli'),
// });

// const ResetPassword = () => {
//     const { token } = useParams(); // URL'den token'ı alın

//     return (
//         <section className='flex items-center justify-center mx-auto'>
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[400px]">
//                 <h1 className="text-xl font-bold">Şifreyi Sıfırlama</h1>
//                 <Formik
//                     initialValues={{ password: '', confirmPassword: '' }}
//                     validationSchema={ResetPasswordSchema}
//                     onSubmit={async (values, { setSubmitting, setStatus }) => {
//                         try {
//                             await resetPassword(token, values); // token ve yeni şifreyi gönderin
//                             setStatus({ success: true, message: "Şifre başarıyla sıfırlandı." });
//                         } catch (error) {
//                             setStatus({ success: false, message: error.message });
//                         }
//                         setSubmitting(false);
//                     }}
//                 >
//                     {({ values, errors, touched, handleChange, handleBlur, handleSubmit, status }) => (
//                         <form onSubmit={handleSubmit}>
//                             <div>
//                                 <label htmlFor="password">Yeni Şifre</label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.password}
//                                 />
//                                 {errors.password && touched.password && <div>{errors.password}</div>}
//                             </div>
//                             <div>
//                                 <label htmlFor="confirmPassword">Şifreyi Onayla</label>
//                                 <input
//                                     type="password"
//                                     name="confirmPassword"
//                                     id="confirmPassword"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.confirmPassword}
//                                 />
//                                 {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}
//                             </div>
//                             <button type="submit">Şifreyi Sıfırla</button>

//                             {/* Başarı ve hata mesajlarını burada göster */}
//                             {status && status.message && (
//                                 <div className={status.success ? "text-green-600" : "text-red-600"}>
//                                     {status.message}
//                                 </div>
//                             )}
//                         </form>
//                     )}
//                 </Formik>
//             </div>
//         </section>
//     );
// };

// export default ResetPassword;



import { Formik } from 'formik';
import * as Yup from 'yup';
import { register, resetPassword } from '../../../services/auth';
import { useParams } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirm password required"),
});

const ResetPassword = () => {
    const { token } = useParams();
    return (
        <section className='flex items-center justify-center mx-auto'>
            <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto  w-[400px] md:h-screen lg:py-0">
                <h1 className='m-5 text-blue-700 text-2xl font-extrabold'>Set a new password now.</h1>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                    <div className="p-2 space-y-2 md:space-y-4 sm:p-8">

                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={RegisterSchema}
                            onSubmit={async (values, { setSubmitting, setStatus }) => {
                                try {
                                    await resetPassword(token, values); // token ve yeni şifreyi gönderin
                                    setStatus({ success: true, message: "Password reset successfully." });
                                } catch (error) {
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
                            }) => (

                                <form className="space-y-2 md:space-y-3" action="#" onSubmit={handleSubmit}>

                                    <p>You can update the password by entering it twice.</p>

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

                                    <div className='flex items-center gap-3'>
                                        <button type="submit" className="text-white bg-dark-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue</button>
                                        <button type="button" className="text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                                    </div>


                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword