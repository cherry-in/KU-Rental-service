import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import Calendar from '../Components/Calendar';
import styled from 'styled-components';

const Drop = styled.div`
    & button {
        border solid 1px;
    }
`

const Schedule = styled.div`
    & ul {
        list-style-type: none;
    }

    & .cd-schedule__events {
        width: 100%;

        > ul {
        display: flex;
        flex-wrap: nowrap;
        }

    & .cd-schedule__timeline {

        > ul {
        line-height: 1em;
        }
    }

    & .cd-schedule__group {
        flex-basis: 0;
        flex-grow: 1;
    }

    & .cd-schedule__event {
        position: absolute;
        z-index: 3;
        width: calc(100% + 2px); // top position and height will be set using js
        left: -1px;
    }
`

function Home() {
    const [click, setState] = useState();

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
                    <button className="btn btn-lg dropdown-toggle mx-auto col-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        기간을 선택해주십시오.
                    </button>
                    <div className="dropdown-menu col-5" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">10 / 5 ~ 10 / 9</a>
                        <a className="dropdown-item" href="#">10 / 12 ~ 10 / 16</a>
                        <a className="dropdown-item" href="#">10 / 19 ~ 10 / 23</a>
                    </div>
                </Drop>

                <ul className="nav nav-tabs nav-justified mt-4" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="7-tab" data-toggle="tab" href="#7" role="tab"> 7-223 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="9-tab" data-toggle="tab" href="#9" role="tab"> 9-116 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="25-tab" data-toggle="tab" href="#25" role="tab"> 25-307 </a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="7" role="tabpanel">
                        
                    {/* <Calendar />
                    <div className="container mt-1 mb-2"></div> */}

                    </div>

                    <div className="tab-pane fade" id="9" role="tabpanel" aria-labelledby="9-tab">
                    </div>

                    <div className="tab-pane fade" id="25" role="tabpanel" aria-labelledby="25-tab">
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;