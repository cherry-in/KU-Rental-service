import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';

function Find() {
    const [state, setState] = useState(false);

    if (state) {
        return <Redirect to="/change" />;
    }

    return (
        <div className="d-flex flex-column justify-content-between vh-100">
            <Formik
                initialValues={{ id: '', question: '', answer: '' }}
                validationSchema={Yup.object({
                    id: Yup.string()
                        .required('학번을 입력해주세요.'),
                    answer: Yup.string()
                        .required('답변을 입력해주세요.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    axios({
                        method: 'post',
                        url: '/login/find',
                        data: values,
                    }).then(res => {
                        if (res.status === 404) return alert(res.data.error)
                        localStorage.setItem('id', res.data.users._id);
                        setState(true);
                    })
                        .catch(err => {
                            alert(err.error)
                        });

                    console.log(values);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);  // finish the cycle in handler
                }}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    getFieldProps,  // contain values, handleChange, handleBlur
                    isSubmitting,
                }) => (
                        <div className="row justify-content-center align-items-center">
                            <form onSubmit={handleSubmit} className="col-sm-3">
                                <div className="form-group mb-4">
                                    <input
                                        className={(touched.id && errors.id ? 'form-control is-invalid' : "form-control")}
                                        type="number"
                                        name="id"
                                        {...getFieldProps('id')}
                                        placeholder="Input Student Id"
                                    />
                                    {touched.id && errors.id ? (
                                        <div className="invalid-feedback text-left">{errors.id}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <label>본인 확인 질문</label>
                                    <Field as="select" name="question">
                                        <option value="">질문을 선택하세요</option>
                                        <option value="life">자신의 인생 좌우명은?</option>
                                        <option value="school">자신이 다녔던 초등학교의 이름은?</option>
                                        <option value="place">기억에 남는 추억의 장소는?</option>
                                    </Field>
                                </div>
                                <div className="form-group mb-4">
                                    <input
                                        className={(touched.answer && errors.answer ? 'form-control is-invalid' : "form-control")}
                                        type="text"
                                        name="answer"
                                        {...getFieldProps('answer')}
                                        placeholder="Input answer" />
                                    {touched.answer && errors.answer ? (
                                        <div className="invalid-feedback text-left">{errors.answer}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                    submit
                                    </button>
                                <button><Link to="/login">로그인</Link></button>
                                <button><Link to="/">홈</Link></button>
                            </form>
                        </div>
                    )}
            </Formik>
        </div>
    );
}

// const withFormik = Formik({
//     mapPropsToValues: () => ({ color: '' }),
//     validationSchema: Yup.object().shape({
//       color: Yup.string().required('Color is required!'),
//     }),
//     handleSubmit: (values, { setSubmitting }) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//       }, 1000);
//     },
//     displayName: 'BasicForm', // helps with React DevTools
//   });

//   const MyForm = props => {
//     const {
//       values,
//       touched,
//       errors,
//       dirty,
//       isSubmitting,
//       handleChange,
//       handleBlur,
//       handleSubmit,
//       handleReset,
//     } = props;
//     return (
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email" style={{ display: 'block' }}>
//           Color
//         </label>
//         <select
//           name="color"
//           value={values.color}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           style={{ display: 'block' }}
//         >
//           <option value="" label="Select a color" />
//           <option value="red" label="red" />
//           <option value="blue" label="blue" />
//           <option value="green" label="green" />
//         </select>
//         {errors.color &&
//           touched.color &&
//           <div className="input-feedback">
//             {errors.color}
//           </div>}

//         <button
//           type="button"
//           className="outline"
//           onClick={handleReset}
//           disabled={!dirty || isSubmitting}
//         >
//           Reset
//         </button>
//         <button type="submit" disabled={isSubmitting}>
//           Submit
//         </button>

//         <DisplayFormikState {...props} />
//       </form>
//     );
//   };


export default Find;
