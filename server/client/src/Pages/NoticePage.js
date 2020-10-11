import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import styled from 'styled-components';

function Notice() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getNotice();
    }, []);

    function dateForm(day) {
        const post_day = new Date(day);
        let year = post_day.getFullYear();
        let month = post_day.getMonth() + 1;
        let date = post_day.getDate();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        const new_date = year + "-" + month + "-" + date;
        return new_date
    }

    function getNotice() {
        axios.get(`/notices`)
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                }
                console.log(res.data);
                setNotices(res.data);
            })
            .catch(err => {
                alert(err.error)
            });
    }
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="row justify-content-center vw-100 vh-90">
                    <div className="col-md-7 col-12">

                        <h2 className="p-3 border-bottom">공지사항</h2>

                        <div id="accordion w-90 pt-1">
                            {notices.map((notice, index) =>
                                <div className="card">
                                    <div className="card-header collapsed card-link w-100 row m-0 p-1" id={"Hnotice_" + index} data-toggle="collapse" href={"#notice_" + index}>
                                        <div>
                                            <div className="col-6 p-0">{notice.notice_title}</div>
                                            <div className="col-3 p-0 text-center">{notice.notice_author}</div>
                                            <div className="col-3 p-0 text-right">{dateForm(notice.post_date)}</div>
                                        </div>
                                    </div>
                                    <div id={"notice_" + index} aria-labelledby={"Hnotice_" + index} className="collapse" data-parent="#accordion">
                                        <div className="card-body">{notice.notice_content}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div >
            </div >
        </div>
    )
}

export default Notice;