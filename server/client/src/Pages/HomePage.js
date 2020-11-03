import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import Schedule from '../Components/Schedule';
// import styled from 'styled-components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// const Tab = styled.ul`
//     & a, a:hover, a:active {
//         color: black;
//     }
// `

function Home() {
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
                        <Schedule room={"9-116"} />
                    </Tab>
                    <Tab eventKey="7-234" title="7-234">
                        <Schedule room={"7-234"} />
                    </Tab>
                    <Tab eventKey="25-101" title="25-101">
                        <Schedule room={"25-101"} />
                    </Tab>
                </Tabs>
                {/* <Tab className="nav nav-tabs nav-justified mt-4" id="myTab" role="tablist" >
                    <li className="nav-item">
                        <a className="nav-link active" id="7-tab" data-toggle="tab" href="#tab-7" role="tab" aria-controls="7" aria-selected="true"> 7-223 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="9-tab" data-toggle="tab" href="#tab-9" role="tab" aria-controls="9" aria-selected="false"> 9-116 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="25-tab" data-toggle="tab" href="#tab-25" role="tab" aria-controls="25" aria-selected="false"> 25-101 </a>
                    </li>
                </Tab>
                <div className="tab-content row justify-content-center" id="myTabContent" >
                    <div className="tab-pane fade show active col-md-11 col-12" id="tab-7" role="tabpanel" aria-labelledby="7-tab">
                        <Schedule schedules={sched1}/>
                    </div>
                    <div className="tab-pane fade show col-md-11 col-12" id="tab-9" role="tabpanel" aria-labelledby="9-tab">
                        <Schedule schedules={sched2}/>
                    </div>
                    <div className="tab-pane fade show col-md-11 col-12" id="tab-25" role="tabpanel" aria-labelledby="25-tab">
                        <Schedule schedules={sched3}/>
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