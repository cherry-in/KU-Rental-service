import React, { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import Menu from '../Components/Menu';
import axios from 'axios';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

function Apply(props) {
    const [state, setState] = useState();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        getUser();
    }, [])

    if (state) {
        return <Redirect to={{
            pathname: `/check/${props.match.params.id}`,
            state: { id: props.match.params.id },
        }} />;
    }

    function time(starttime) {
        if (starttime == 21) {
            return (<Field as="select" name="usetime">
                <option value="">이용시간을 선택하세요</option>
                <option value="1">1시간</option>
            </Field>)
        }
        if (starttime == 20) {
            return (<Field as="select" name="usetime">
                <option value="">이용시간을 선택하세요</option>
                <option value="1">1시간</option>
                <option value="2">2시간</option>
            </Field>)
        }
        return (<Field as="select" name="usetime">
            <option value="">이용시간을 선택하세요</option>
            <option value="1">1시간</option>
            <option value="2">2시간</option>
            <option value="3">3시간</option>
        </Field>)
    }

    function getUser() {
        axios.get(`/users/${props.match.params.id}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                }
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                alert(err.error)
            });
    }

    return (
        <div>
            <Menu />
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Formik
                            initialValues={{
                                _id: `${props.match.params.id}`,
                                date: '',
                                starttime: '',
                                usetime: '',
                                room: '',
                                reason: '',
                                students: [
                                    {
                                        member: '',
                                    },
                                ],
                            }}
                            validationSchema={Yup.object({
                                date: Yup.string()
                                    .required('날짜를 입력해주세요.'),
                                room: Yup.string()
                                    .required('강의실 번호를 입력해주세요.'),
                                reason: Yup.string()
                                    .required('대관목적을 입력해주세요.'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values)
                                axios({
                                    method: 'post',
                                    url: '/reserves',
                                    data: values
                                }).then(res => {
                                    if (res.status === 404) {
                                        alert(res.data.error)
                                        return window.location.reload();
                                    }
                                    alert("신청이 완료되었습니다!");
                                    setState(true);
                                    console.log("res.data", res.data)
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
                                values,
                                handleSubmit,
                                getFieldProps,
                                isSubmitting,
                            }) => (
                                    <form onSubmit={handleSubmit} className="d-flex flex-column">
                                        <h3 className="form-group font-weight-bold">
                                            <label className="pr-2 ">대표자 :</label>{user.name}
                                        </h3>

                                        <div className="form-group">
                                            <div className={touched.date && errors.date ? "text-danger" : ""}>신청날짜</div>
                                            <input
                                                className={(touched.date && errors.date ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="date"
                                                {...getFieldProps('date')}
                                                placeholder="yyyy-mm-dd"
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label>이용시작시간</label>
                                            <div>
                                                <Field as="select" name="starttime">
                                                    <option value="">이용시작시간</option>
                                                    <option value="9">9시</option>
                                                    <option value="10">10시</option>
                                                    <option value="11">11시</option>
                                                    <option value="12">12시</option>
                                                    <option value="13">13시</option>
                                                    <option value="14">14시</option>
                                                    <option value="15">15시</option>
                                                    <option value="16">16시</option>
                                                    <option value="17">17시</option>
                                                    <option value="18">18시</option>
                                                    <option value="19">19시</option>
                                                    <option value="20">20시</option>
                                                    <option value="21">21시</option>
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="form-group mb-4">
                                            <label>이용시간</label>
                                            <div>
                                                {time(values.starttime)}
                                            </div>
                                        </div>

                                        <div className="form-group mb-4">
                                            <div className={touched.room && errors.room ? "text-danger" : ""}>강의실</div>
                                            <Field as="select" name="room">
                                                <option value="">강의실을 선택하세요</option>
                                                <option value="9-116">9-116</option>
                                                <option value="7-234">7-234</option>
                                                <option value="25-101">25-101</option>
                                            </Field>
                                        </div>

                                        <div className="form-group mb-4">
                                            <div className={touched.reason && errors.reason ? "text-danger" : ""}>대관 목적</div>
                                            <input
                                                className={(touched.reason && errors.reason ? 'form-control is-invalid' : "form-control")}
                                                type="text"
                                                name="reason"
                                                {...getFieldProps('reason')}
                                                placeholder="대관목적을 입력해 주세요."
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <FieldArray name="students">
                                                {({ insert, remove, push }) => (
                                                    <div>
                                                        <div className={touched.date && errors.date ? "text-danger" : ""}>이용자</div>
                                                        {values.students.map((student, index) => (
                                                            <Row key={index}>
                                                                <Field
                                                                    name={`students.${index}.member`}
                                                                    placeholder="이용자 성함을 입력하세요."
                                                                    type="text"
                                                                />
                                                                <ErrorMessage
                                                                    name={`friends.${index}.name`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="secondary"
                                                                    onClick={() => remove(index)}
                                                                >X</button>
                                                            </Row>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => push({ member: '' })}
                                                        >추가</button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                            신청하기
                                        </button>
                                    </form>
                                )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Apply