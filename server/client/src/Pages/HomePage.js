import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import Schedule from '../Components/Schedule';
import { Redirect } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';

function Home() {
    const [key, setKey] = useState('9-116');
    const [state, setState] = useState()

    useEffect(() => {
        tcheck();
    }, []);

    if (state) return <Redirect to="/" />;

    function tcheck() {
        axios.get(`/users/${localStorage.getItem('_id')}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                    localStorage.clear();
                    setState(true);
                }
            }).catch(err => {
                alert(err.error)
            });
    }

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
                <Tabs defaultActiveKey="9-116" id="uncontrolled-tab-example" onSelect={(k) => setKey(k)}>
                    <Tab eventKey="9-116" title="9-116">
                        <Schedule room={key} />
                    </Tab>
                    <Tab eventKey="7-234" title="7-234">
                        <Schedule room={key} />
                    </Tab>
                    <Tab eventKey="25-101" title="25-101">
                        <Schedule room={key} />
                    </Tab>
                </Tabs>
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