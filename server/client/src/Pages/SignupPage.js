import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';

function Signup() {
      const [state, setState] = useState(false);

      if (state) {
        return <Redirect to="/login" />;
      }

    return (
        <div className="d-flex flex-column justify-content-between vh-100">
            <Formik
                initialValues={{ name: '', id: '', password: '', password2: ''}}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('이름을 입력해주세요.'),
                    id: Yup.string()
                        .required('학번을 입력해주세요.'),
                    password: Yup.string()
                        .required('비밀번호를 입력해주세요.')
                        .min(8, '8자 이상 입력해주세요.'),
                    password2: Yup.string()
                        .required('비밀번호를 다시 입력해주세요.')
                        .min(8, '8자 이상 입력해주세요.')
                        .oneOf([Yup.ref("password"), null], '비밀번호가 일치하지 않습니다.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    axios({
                      method: 'post',
                      url: '/users',
                      data: values,
                    }).then(res => {
                      if (res.status === 404) return alert(res.data.error)
                    alert("회원가입이 완료되었습니다!")

                      setState(true);
                    })
                      .catch(err => {
                        alert(err.error)
                      });

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
                                        className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                        type="text"
                                        name="name"
                                        {...getFieldProps('name')}
                                        placeholder="Input Name" />
                                    {touched.name && errors.name ? (
                                        <div className="invalid-feedback text-left">{errors.name}</div>
                                    ) : null}
                                </div>
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
                                    <input
                                        className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                                        type="password"
                                        name="password"
                                        {...getFieldProps('password')}
                                        placeholder="Input Password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback text-left">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <input
                                        className={(touched.password2 && errors.password2 ? 'form-control is-invalid' : "form-control")}
                                        type="password"
                                        name="password2"
                                        {...getFieldProps('password2')}
                                        placeholder="Input Confirm Password"
                                    />
                                    {touched.password2 && errors.password2 ? (
                                        <div className="invalid-feedback text-left">{errors.password2}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                    Sign Up
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


export default Signup;
