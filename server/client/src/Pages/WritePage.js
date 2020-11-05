import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../Components/Menu';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field, Formik } from 'formik';

function Write({ match }) {
    const [state, setState] = useState(false);
    const [revision, setRevision] = useState({ title: '', content: '' });
    // const [isadmin, setIsadmin] = useState({ok:""});
    // const [user, setUser] = useState({ role: "" })

    // if (isadmin.ok==="no") return <Redirect to="/" />;

    useEffect(() => {
        getOne(match.params.id)
    }, [])

    if (state) {
        return <Redirect to="/notice" />;
    }

    function getOne (id) {
        if (id) {
            axios.get(`/notices/${id}`)
                .then(res => {
                    if (res.status !== 201) {
                        alert(res.data.error);
                    }
                    setRevision({ title: res.data.notice_title, content: res.data.notice_content })
                })
                .catch(err => {
                    alert(err.error)
                });
        }
    };

    // function putData (match, revision) {
    //     if (!match.params.id) return { title: '', content: '' }
    //     else return { title: revision.notice_title, content: revision.notice_content }
    // };

    // function acheck() {
    //     axios.get(`/users/${localStorage.getItem('_id')}`, {
    //         headers: { authorization: localStorage.getItem('token') },
    //     })
    //         .then(res => {
    //             if (res.status !== 201) {
    //                 alert(res.data.error);
    //                 localStorage.clear();
    //                 setIsadmin({ok:"no"});
    //             }
    //             if (res.data.role == "admin") {
    //                 setUser(res.data)
    //             }
    //         }).catch(err => {
    //             alert(err.error)
    //         });  
    // }

    return (
        <div>
            {console.log("revision", revision.title, revision.content)}
            <Menu/>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md={5} xs={11} className="pt-3" >
                        <Formik
                            initialValues={{title: revision.title, content: revision.content}}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('제목을 입력해주세요.'),
                                content: Yup.string()
                                    .required('내용을 입력해주세요.'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!match.params.id) {
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
                                } else {
                                    axios({
                                        method: 'put',
                                        url: '/writes/${id}',
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
                                }
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
                                            placeholder="제목" />
                                    </div>
                                    {console.log(revision.title)}
                                    <div className="form-group">
                                        <div className={touched.name && errors.name ? "text-danger" : ""}>내용</div>
                                        <Field as="textarea" rows={8} style={{ "min-width": "100%" }}
                                            {...getFieldProps('content')} />
                                    </div>
                                    <Button className="mb-2" variant="dark" type="submit" disabled={isSubmitting}>{match.params.id ? "공지 수정" : "공지 등록"}</Button>
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
