import React, { useState, useEffect } from 'react';
import { Field, Formik } from 'formik';
import axios from 'axios';
import { render } from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

function List(props) {
    function remove() {
        console.log(props._id)
        axios.delete(`/reserves/${props._id}`, { data: { _id: props._id, }})
            .then(res => {
                if (res.status === 404) return alert(res.data.error)
                alert("신청이 완료되었습니다!")
            })
            .catch(err => {
                alert(err.error)
            });
    };
    return (
        <div>
            <div>날짜 : {props.date}</div>
            <div>이름 : {props.name}</div>
            <div>강의실 : {props.room}</div>
            <div>시간 : {props.time}</div>
            <div>사용인원 : {props.num}</div>
            <div>{props._id}</div>
            <form onSubmit={remove} className="col-sm-3">
                <button type="submit" className="btn btn-dark">
                    신청 취소
                </button>
            </form>
        </div>
    )
}

export default List;