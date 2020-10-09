import React, { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import Menu from '../Components/Menu';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

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
            <Formik
                initialValues={{
                    _id: `${props.match.params.id}`,
                    date: '',
                    time: '',
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
                    time: Yup.string()
                        .required('시간을 입력해주세요.'),
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
                        if (res.status === 404) return alert(res.data.error)
                        alert("신청이 완료되었습니다!");
                        setState(true);
                    })
                        .catch(err => {
                            alert(err.error)
                        });

                    // setTimeout(() => {
                    //     setSubmitting(false);
                    // }, 400);  // finish the cycle in handler
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
                        <div className="row justify-content-center align-items-center">
                            {console.log(user)}
                            <form onSubmit={handleSubmit} className="col-sm-3">
                                <div className="form-group mb-4">
                                    <label>대표자</label>
                                    <div>{user.name}</div>
                                </div>
                                <div className="form-group mb-4">
                                    <label>신청날짜</label>
                                    <input
                                        className={(touched.date && errors.date ? 'form-control is-invalid' : "form-control")}
                                        type="number"
                                        name="date"
                                        {...getFieldProps('date')}
                                        placeholder="2020mmdd"
                                    />
                                    {touched.date && errors.date ? (
                                        <div className="invalid-feedback text-left">{errors.date}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <label>이용시간</label>
                                    <input
                                        className={(touched.time && errors.time ? 'form-control is-invalid' : "form-control")}
                                        type="text"
                                        name="time"
                                        {...getFieldProps('time')}
                                        placeholder="ex) 11:00~14:00"
                                    />
                                    {touched.time && errors.time ? (
                                        <div className="invalid-feedback text-left">{errors.time}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <label>강의실</label>
                                    <input
                                        className={(touched.room && errors.room ? 'form-control is-invalid' : "form-control")}
                                        type="text"
                                        name="room"
                                        {...getFieldProps('room')}
                                        placeholder="bn-nnn"
                                    />
                                    {touched.room && errors.room ? (
                                        <div className="invalid-feedback text-left">{errors.room}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <label>대관목적</label>
                                    <input
                                        className={(touched.reason && errors.reason ? 'form-control is-invalid' : "form-control")}
                                        type="text"
                                        name="reason"
                                        {...getFieldProps('reason')}
                                        placeholder="대관목적을 입력해 주세요."
                                    />
                                    {touched.reason && errors.reason ? (
                                        <div className="invalid-feedback text-left">{errors.reason}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-4">
                                    <FieldArray name="students">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                <label>이용자</label>
                                                {
                                                    values.students.map((student, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col">
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
                                                                >
                                                                    X
                                                                        </button>

                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => push({ member: '' })}
                                                >
                                                    추가
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                    신청하기
                                </button>
                            </form>
                        </div>
                    )}
            </Formik>
        </div>
    )
}

export default Apply