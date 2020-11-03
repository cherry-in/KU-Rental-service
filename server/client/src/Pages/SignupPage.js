import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Container, Navbar, Button } from 'react-bootstrap';

const Menu = styled(Navbar)`
    background-color: #7B031D;

    a {
        color : white;
    }
`

const Wow = styled.div`
    height: 90vh;

    & #reCheck::after {
        content: '비밀번호를 다시 입력하세요';
    }

    & #reCheck:not(.right) {
        content: '비밀번호가 일치하지 않습니다.';
        color: red;
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
            <Menu expand="md" variant="dark">
                <Navbar.Brand>회원가입</Navbar.Brand>
            </Menu>
            <Container fluid>
                <Wow className="row justify-content-center">
                    <Col md={3} xs={11} className="p-0">
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
                                    <form onSubmit={handleSubmit} className="d-flex flex-column pt-3">
                                        <div className="form-group ">
                                            <div className={touched.name && errors.name ? "text-danger" : ""}>이름을 입력하세요</div>
                                            <input
                                                className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="name"
                                                {...getFieldProps('name')}
                                                placeholder="이름" />
                                        </div>

                                        <div className="form-group">
                                            <div className={touched.id && errors.id ? "text-danger" : ""}>학번을 입력하세요</div>
                                            <input
                                                className={(touched.id && errors.id ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="id"
                                                {...getFieldProps('id')}
                                                placeholder="학번/교번"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <div className={touched.password && errors.password ? "text-danger" : ""}>비밀번호를 입력하세요(8자리 이상)</div>
                                            <input
                                                className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                                                type="password"
                                                name="password"
                                                {...getFieldProps('password')}
                                                placeholder="비밀번호"
                                            />
                                        </div>

                                        <div className="form-group">
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
                                            <label>본인 확인 질문</label>
                                            <Field as="select" name="question">
                                                <option value="">질문을 선택하세요</option>
                                                <option value="life">자신의 인생 좌우명은?</option>
                                                <option value="school">자신이 다녔던 초등학교의 이름은?</option>
                                                <option value="place">기억에 남는 추억의 장소는?</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <div className={touched.answer && errors.answer ? "text-danger" : ""}>답변을 입력해주세요.</div>
                                            <input
                                                className={(touched.answer && errors.answer ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="answer"
                                                {...getFieldProps('answer')}
                                                placeholder="Input answer" />
                                        </div>
                                        <Button type="submit" variant="secondary" className="mb-2" disabled={isSubmitting}>회원가입</Button>
                                        <Button variant="outline-secondary" as={Link} to="/login">로그인하러 가기</Button>
                                    </form>
                                )}
                        </Formik>
                    </Col>
                </Wow>
            </Container>
        </div >

    );
}

export default Signup;