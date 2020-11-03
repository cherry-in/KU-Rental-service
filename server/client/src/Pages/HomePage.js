import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Components/Menu';
import Schedule from '../Components/Schedule';
import styled from 'styled-components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// const Tab = styled.ul`
//     & a, a:hover, a:active {
//         color: black;
//     }
// `

function Home() {
    const [sched1, setSched1] = useState();
    const [sched2, setSched2] = useState();
    const [sched3, setSched3] = useState();

    useEffect(() => {
        const dd = [{
            id: '1',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-02T11:00:00',
            end: '2020-11-02T12:00:00',
        }, {
            id: '2',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-03T10:00:00',
            end: '2020-11-03T11:00:00',
        }];
        setSched1(dd)
        const dd2 = [{
            id: '3',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-03T12:00:00',
            end: '2020-11-03T13:00:00',
        }, {
            id: '4',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-04T10:00:00',
            end: '2020-11-04T11:00:00',
        }];
        setSched2(dd2)
        const dd3 = [{
            id: '5',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-04T12:00:00',
            end: '2020-11-04T13:00:00',
        }, {
            id: '6',
            calendarId: 'Subject',
            category: 'time',
            start: '2020-11-05T10:00:00',
            end: '2020-11-05T11:00:00',
        }];
        setSched3(dd3)
    }, []);

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
                <Tabs defaultActiveKey="9-116" id="uncontrolled-tab-example">
                    <Tab eventKey="9-116" title="9-116">
                        <Schedule schedules={sched1} />
                    </Tab>
                    <Tab eventKey="7-234" title="7-234">
                        <Schedule schedules={sched2} />
                    </Tab>
                    <Tab eventKey="25-101" title="25-101">
                        <Schedule schedules={sched3} />
                    </Tab>
                </Tabs>
                {/* <Tab className="nav nav-tabs nav-justified mt-4" id="myTab" role="tablist" style={show ? {} : { display: "none" }}>
                    <li className="nav-item">
                        <a className="nav-link active" id="7-tab" data-toggle="tab" href="#tab-7" role="tab" aria-controls="7" aria-selected="true"> 7-223 </a>
                    </li>
                </Tab>
                <div className="tab-content row justify-content-center" id="myTabContent" style={show ? {} : { display: "none" }}>
                    <div className="tab-pane fade show active col-md-11 col-12" id="tab-7" role="tabpanel" aria-labelledby="7-tab">
                        <Schedule day={sendDate} schedules={sched1}/>
                        {console.log(sched1)}
                    </div>
                </div> */}
                <h3>유의사항</h3>
                <p>
                    <ul>
                        <li>강의실을 대관하는 대표자를 기준으로 최대 주 6시간까지 대관이 가능합니다.</li>
                        <li>1회 대관시 최대 3시간까지 이용이 가능합니다. (1시간 단위로 대관 가능)</li>
                        <li><strong style={{ color: "red" }}>대관 시간 이외 강의실을 이용하다 적발될 경우 한달 간 강의실 이용이 불가합니다.</strong></li>
                    </ul>
                </p>
                <div className="bg-white">
                    <h6>고려대학교 대관시스템</h6>
                </div>
            </div>
        </div>
    )
}

export default Home;