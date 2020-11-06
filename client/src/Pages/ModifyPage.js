import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../Components/Menu';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field, Formik } from 'formik';

function Modify({ match }) {
    const [state, setState] = useState(false);
    const [modification, setModification] = useState({ title: "", content: "" });
    const [isadmin, setIsadmin] = useState({ ok: "" });
    const [user, setUser] = useState({ name: "", role: "" })

    useEffect(() => {
        acheck();
        getOne(match.params.id);
    }, [])

    if (isadmin.ok === "no") return <Redirect to="/" />;

    if (state) {
        return <Redirect to="/notice" />;
    }

    function getOne(id) {
        if (id) {
            axios.get(`/api/notices/${match.params.id}`)
                .then(res => {
                    if (res.status !== 201) {
                        alert(res.data.error);
                    }
                    setModification({ title: res.data.notice_title, content: res.data.notice_content })
                })
                .catch(err => {
                    alert(err.error)
                });
        }
    };

    function acheck() {
        axios.get(`/api/users/admin/${localStorage.getItem('_id')}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                    setIsadmin({ ok: "no" });
                }
                setUser({ name: res.data.name, role: res.data.role })

            }).catch(err => {
                alert(err.error)
            });
    }

    return (
        <div>
            <Menu />
            <Container fluid>
                {console.log(modification)}
                <Row className="justify-content-center">
                    <Col md={5} xs={11} className="pt-3" >
                        <Formik
                            initialValues={{ name: user.name, title: modification.title, content: modification.content }}
                            enableReinitialize={true}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('제목을 입력해주세요.'),
                                content: Yup.string()
                                    .required('내용을 입력해주세요.'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                axios({
                                    method: 'put',
                                    url: `/api/writes/${match.params.id}`,
                                    data: values,
                                })
                                    .then(res => {
                                        if (res.status === 404) return alert(res.data.error)
                                        alert("공지 수정이 완료되었습니다.")
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
                                <form onSubmit={handleSubmit} className="d-flex flex-column">
                                    <div className="form-group">
                                        <div className={touched.name && errors.name ? "text-danger" : ""}>제목</div>
                                        <input className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                            type="text"
                                            title="title"
                                            {...getFieldProps('title')}
                                            disabled />
                                    </div>
                                    <div className="form-group">
                                        <div className={touched.name && errors.name ? "text-danger" : ""}>내용</div>
                                        <Field as="textarea" rows={8} style={{ "min-width": "100%" }}
                                            {...getFieldProps('content')} />
                                    </div>
                                    <Button className="mb-2" variant="dark" type="submit" disabled={isSubmitting}>공지 수정</Button>
                                </form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Modify