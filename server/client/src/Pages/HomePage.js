import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import Calendar from '../Components/Calendar';
import styled from 'styled-components';
import moment from 'moment';
import "moment/locale/ko";

moment.locale("ko", {
    week: {
        dow: 1
    }
});

const Drop = styled.div`
    & button {
        border solid 1px;
    }
`

const Schedule = styled.div`
    & ul {
        list-style-type: none;
    }
`

function Home() {
    const [show, setShow] = useState(false);
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        Dateform();
    }, []);

    function Dateform() {
        let today = moment();
        let weeks = [];
        let dates = { start: null, end: null };
        for (let i = 0; i < 6; i++) {
            if (i !== 0) {
                today.add(7, 'd');
            }

            dates.start = today.startOf('week').format("MMM Do");
            dates.end = today.endOf('week').weekday(4).format("MMM Do");
            const week = dates.start + "  ~  " + dates.end;
            weeks.push(week);
        };
        setWeeks([...weeks])
    };

    return (
        <div>
            <Menu />
            <div className="container mt-3">

                <h2>대관 현황</h2>
                <p>
                    <strong>대관 가능 시간</strong>
                    <ul>
                        <li>평일: 9시 - 22시/ 예약가능 시간 이후 폐쇄</li>
                        <li>주말: 이용 불가</li>
                    </ul>
                </p>

                <Drop className="row dropdown mt-1 mb-2">
                    <div className="container">
                        <Drop className="row dropdown mt-5 mb-5">
                            <button className="btn btn-lg dropdown-toggle mx-auto col-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                기간을 선택해주십시오.
                    </button>
                            <div className="dropdown-menu col-5" aria-labelledby="dropdownMenuButton">
                                {weeks.map((week, index) => (
                                    <a className="dropdown-item" href="#" onClick={() => setShow(true)}>{week}</a>
                                ))}
                            </div>
                        </Drop>
                    </div>
                </Drop>
            </div>
        </div>
    )
}

export default Home;