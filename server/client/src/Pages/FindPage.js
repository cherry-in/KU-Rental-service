import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const Nav = styled.nav`
    background-color: #7B031D;
    height: 10vh;

    a {
        color: #ffffff;
    }
`

function Find() {
    const [state, setState] = useState(false);

    if (state) {
        return <Redirect to={{
            pathname: `/change/${localStorage.getItem('_id')}`,
            state: { id: localStorage.getItem('_id') },
        }} />;
    }
    return (
        <div className="vh-100">
            <Nav className="navbar sticky-top navbar-expand-md">
                <a class="navbar-brand" href="#">비밀번호 찾기</a>
            </Nav>
            <Container fluid>
                <Row className="justify-content-center rrooww">
                    <Col md={4} className="d-flex align-items-center h-100">
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
                                    localStorage.setItem('_id', res.data.users._id)
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
                                    <Row className="justify-content-center align-items-center">
                                        <form onSubmit={handleSubmit}>
                                            <Col sm={3}>
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
                                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>submit </button>
                                                <button><Link to="/login">로그인</Link></button>
                                                <button><Link to="/">홈</Link></button>
                                            </Col>
                                        </form>
                                    </Row>
                                )}
                        </Formik>
                    </Col>
                </Row>
            </Container >
        </div >
    );
}


export default Find;
