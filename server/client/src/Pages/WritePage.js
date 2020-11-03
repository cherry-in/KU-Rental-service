import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Menu from '../Components/Menu';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Field, Formik } from 'formik';

function Write() {
    const [submitData, setSubmitData] = useState(false);
    const [state, setState] = useState(false);

    if (state) {
        return <Redirect to="/notice" />;
    }
    return (
        <div>
            <Menu />
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md={12} xl={8} style={{ height: "35em" }}>
                        <Formik
                            initialValues={{ title: '', content: '' }}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('제목을 입력해주세요.'),
                                content: Yup.string()
                                    .required('내용을 입력해주세요.'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                axios({
                                    method: 'post',
                                    url: '/writes',
                                    data: values,
                                }).then(res => {
                                    if (res.status === 404) return alert(res.data.error)
                                    alert("공지 등록이 완료되었습니다.")
                                    setState(true);
                                })
                                    .catch(err => {
                                        alert(err.error)
                                    });

                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);  // finish the cycle in handler
                            }}
                        >{({
                            errors,
                            touched,
                            handleSubmit,
                            getFieldProps,  // contain values, handleChange, handleBlur
                            isSubmitting,
                        }) => (
                                <form onSubmit={handleSubmit} className="asd">
                                    {/* col-sm-3 */}

                                    <div className="form-group">
                                        {/*  mb-4 */}
                                        <div className={touched.name && errors.name ? "text-danger" : ""}>제목</div>
                                        <input className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                            type="text"
                                            title="title"
                                            {...getFieldProps('title')}
                                            placeholder="제목" />
                                    </div>
                                    <div className="form-group ">
                                        {/*  mb-4 */}
                                        <div className={touched.name && errors.name ? "text-danger" : ""}>내용</div>
                                        <Field as="textarea" rows={8} cols={175}
                                        {...getFieldProps('content')} />
                                    </div>
                                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>공지 등록</button>
                                </form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
 
export default Write
