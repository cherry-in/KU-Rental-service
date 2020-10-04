import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Menu from '../Components/Menu';
import axios from 'axios';

function Apply() {
    return (
        <div>
            <Menu />
            <div className="container">apply
            <Formik
                    initialValues={{
                        date: "20201003",
                        time: "시간",
                        room: "9-116",
                        name: "종윤",
                        _id: "5f786720c45bbf6c68899c51",
                        reason: "study hard",
                        member: "jinju rkyoung",
                        approve: false,
                        num: 5,
                    }}
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
                        handleSubmit,
                        isSubmitting,
                    }) => (
                            <div className="row justify-content-center align-items-center">
                                <form onSubmit={handleSubmit} className="col-sm-3">
                                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                        Sign Up
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