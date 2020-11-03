import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';

const Menu = styled(Navbar)`
    background-color: #7B031D;

    a {
        color : white;
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
            <Menu expand="md" variant="dark">
                <Navbar.Brand>비밀번호 찾기</Navbar.Brand>
            </Menu>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md={3} xs={11} className="p-0">
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
                                    <form onSubmit={handleSubmit} className="d-flex flex-column pt-5">
                                        <div className="form-group pb-2">
                                            <div className={touched.id && errors.id ? "text-danger" : ""}>학번을 입력하세요</div>
                                            <input
                                                className={(touched.id && errors.id ? 'form-control is-invalid' : "form-control")}
                                                type="number"
                                                name="id"
                                                {...getFieldProps('id')}
                                                placeholder="Input Student Id"
                                            />
                                        </div>

                                        <div className="form-group pb-2">
                                            <label className="pr-2">본인 확인 질문</label>
                                            <Field as="select" name="question">
                                                <option value="">질문을 선택하세요</option>
                                                <option value="life">자신의 인생 좌우명은?</option>
                                                <option value="school">자신이 다녔던 초등학교의 이름은?</option>
                                                <option value="place">기억에 남는 추억의 장소는?</option>
                                            </Field>
                                        </div>

                                        <div className="form-group pb-2">
                                            <div className={touched.answer && errors.answer ? "text-danger" : ""}>답변을 입력해주세요.</div>
                                            <input
                                                className={(touched.answer && errors.answer ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="answer"
                                                {...getFieldProps('answer')}
                                                placeholder="Input answer" />
                                        </div>

                                        <Button className="mb-2" variant="secondary" type="submit" disabled={isSubmitting}>비밀번호 찾기</Button>
                                        <Button variant="outline-secondary" as={Link} to="/login">로그인하러 가기</Button>
                                    </form>
                                )}
                        </Formik>
                    </Col>
                </Row>
            </Container >
        </div >
    );
}


export default Find;
