import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #7B031D;
    height: 10vh;

    a {
        color: #ffffff;
    }
`

const Wow = styled.div`
    height: 90vh;

    & #reCheck::after {
        content: '비밀번호를 다시 입력하세요';
    }

    & #reCheck:not(.right) {
        content: '비밀번호가 다릅니다.';
        color: red;
    }

    & .asd {
        display: flex;
        flex-direction: column;
    }
`

function Signup() {
    const [state, setState] = useState(false);
    const [checkPw, setCheckPw] = useState(true);

    if (state) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="vh-100">
            <Nav className="navbar sticky-top navbar-expand-md">
                <a class="navbar-brand" href="#">회원가입</a>
            </Nav>
            <div className="container-fluid">
                <Wow className="row justify-content-center rrooww">
                    <div className="col-md-4 col-12 d-flex align-items-center h-100">
                        <Formik
                            initialValues={{ name: '', id: '', password: '', password2: '', question: '', answer: '' }}
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
                                answer: Yup.string()
                                    .required('답변을 입력해주세요.'),
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
                                    < form onSubmit={handleSubmit} className="asd">
                                        {/* col-sm-3 */}

                                        <div className="form-group ">
                                            {/*  mb-4 */}
                                            <div className={touched.name && errors.name ? "text-danger" : ""}>이름을 입력하세요</div>
                                            <input
                                                className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="name"
                                                {...getFieldProps('name')}
                                                placeholder="이름" />
                                        </div>
                                        <div className="form-group">
                                            {/*  mb-4 */}
                                            <div className={touched.id && errors.id ? "text-danger" : ""}>학번을 입력하세요</div>

                                            <input
                                                className={(touched.id && errors.id ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="id"
                                                {...getFieldProps('id')}
                                                placeholder="학번/교번"
                                            />
                                            {/* {touched.id && errors.id ? (
                                                    <div className="invalid-feedback text-left">{errors.id}</div>
                                                ) : null} */}
                                        </div>
                                        <div className="form-group">
                                            {/*  mb-4 */}
                                            <div className={touched.password && errors.password ? "text-danger" : ""}>비밀번호를 입력하세요(8자리 이상)</div>

                                            <input
                                                className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                                                type="password"
                                                name="password"
                                                {...getFieldProps('password')}
                                                placeholder="비밀번호"
                                            />
                                            {/* {touched.password && errors.password ? (
                                                    <div className="invalid-feedback text-left">{errors.password}</div>
                                                ) : null} */}
                                        </div>
                                        <div className="form-group">
                                            {/*  mb-4 */}
                                            {touched.password2 && errors.password2 ? setCheckPw(false) : null}
                                            <div id="reCheck" className={checkPw ? "right" : "err"}></div>
                                            <input
                                                className={touched.password2 && errors.password2 ? "form-control is-invalid" : "form-control"}
                                                type="password"
                                                name="password2"
                                                {...getFieldProps('password2')}
                                                placeholder="비밀번호 확인"
                                            />

                                        </div>
                                        <div className="form-group">
                                            {/*  mb-4 */}
                                            <label>본인 확인 질문</label>
                                            <Field as="select" name="question">
                                                <option value="">질문을 선택하세요</option>
                                                <option value="life">자신의 인생 좌우명은?</option>
                                                <option value="school">자신이 다녔던 초등학교의 이름은?</option>
                                                <option value="place">기억에 남는 추억의 장소는?</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            {/*  mb-4 */}
                                            <div className={touched.answer && errors.answer ? "text-danger" : ""}>답변을 입력해주세요.</div>

                                            <input
                                                className={(touched.answer && errors.answer ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="answer"
                                                {...getFieldProps('answer')}
                                                placeholder="Input answer" />
                                        </div>
                                        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>회원가입</button>
                                        <button class="btn btn-light"><Link to="/login">로그인</Link></button>
                                        <button class="btn btn-light"><Link to="/">홈</Link></button>
                                    </form>
                                )}
                        </Formik>
                    </div>
                </Wow>
            </div>
        </div >

    );
}


export default Signup;