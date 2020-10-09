import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';

function Notice() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getNotice();
    }, []);

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
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {notices.map((notice) => <div>{notice.notice_title}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice