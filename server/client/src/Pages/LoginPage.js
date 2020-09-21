import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Log = styled.div`
    background-color: #981e1e;
`
const Logo = styled.div`
    background-color: #E76A6A;
`


function Login() {
    const [state, setState] = useState(false);

    if (state) {
        return <Redirect to="/" />;
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <Logo className="col-md-5 col-12">
                    <h2>고려대학교</h2>
                    <h4>대관 시스템</h4>
                </Logo>
                <Log className="col-md-7 col-12">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('이메일형식이 유효하지 않습니다.')
                                .required('이메일을 입력해주세요.'),
                            password: Yup.string()
                                .required('비밀번호를 입력해주세요.')
                                .min(8, '8자 이상 입력해주세요.'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            axios({
                                method: 'post',
                                url: '/login',
                                data: values,
                            }).then(res => {
                                if (res.status === 404) return alert(res.data.error)
                                alert("로그인이 완료되었습니다!")

                                localStorage.setItem('token', res.data.token);
                                localStorage.setItem('id', res.data.users._id);
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
                                                className={(touched.email && errors.email ? 'form-control is-invalid' : "form-control")}
                                                type="email"
                                                name="email"
                                                {...getFieldProps('email')}
                                                placeholder="Input Email"
                                            />
                                            {touched.email && errors.email ? (
                                                <div className="invalid-feedback text-left">{errors.email}</div>
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
                                        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                            Login
                                        </button>
                                        <button><Link to="/home">홈</Link></button>
                                        <Link to="/signup">비밀번호를 잊으셨나요?</Link>
                                        <div></div>
                                        <Link to="/signup">회원이 아니신가요?</Link>
                                    </form>
                                </div>
                            )}
                    </Formik>

                </Log>
            </div>
        </div>
    )
}

export default Login