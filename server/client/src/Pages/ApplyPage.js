import React from 'react';
import { Formik } from 'formik';
import Menu from '../Components/Menu';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';

function Apply() {
    return (
        <div>
            <Menu />
            <div className="container">apply
            <Formik
                    initialValues={{
                        date: '',
                        time: '',
                        room: '',
                        name: '',
                        _id: "5f786720c45bbf6c68899c51",
                        reason: '',
                        member: '',
                        approve: false,
                        num: 5,
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
                        name: Yup.string()
                            .required('대표자 성함을 입력해주세요.'),
                        member: Yup.string()
                            .required('이용자 성함을 입력해주세요.'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        axios({
                            method: 'post',
                            url: '/reserves',
                            data: values,
                        }).then(res => {
                            if (res.status === 404) return alert(res.data.error)
                            alert("신청이 완료되었습니다!")

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
                        getFieldProps,
                        isSubmitting,
                    }) => (
                            <div className="row justify-content-center align-items-center">
                                <form onSubmit={handleSubmit} className="col-sm-3">
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
                                        <label>대표자</label>
                                        <input
                                            className={(touched.name && errors.name ? 'form-control is-invalid' : "form-control")}
                                            type="text"
                                            name="name"
                                            {...getFieldProps('name')}
                                            placeholder="대표자 성함을 입력해 주세요"
                                        />
                                        {touched.name && errors.name ? (
                                            <div className="invalid-feedback text-left">{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>이용자</label>
                                        <input
                                            className={(touched.member && errors.member ? 'form-control is-invalid' : "form-control")}
                                            type="text"
                                            name="member"
                                            {...getFieldProps('member')}
                                            placeholder="이용자 성함을 입력해 주세요. "
                                        />
                                        {touched.member && errors.member ? (
                                            <div className="invalid-feedback text-left">{errors.member}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                        신청하기
                                    </button>
                                </form>
                            </div>
                        )}
                </Formik>
            </div>
        </div>
    )
}

export default Apply