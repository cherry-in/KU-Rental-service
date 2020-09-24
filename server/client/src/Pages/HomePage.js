import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import styled from 'styled-components';

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
    return (
        <div>
            <Menu />
            <div className="container">

                <h2>대관 현황</h2>

                <p>
                    <strong>대관 가능 시간</strong>
                    <ul>
                        <li>평일: 9시 - 22시/ 예약가능 시간 이후 폐쇄</li>
                        <li>주말: 이용 불가</li>
                    </ul>
                </p>

                <ul className="nav nav-tabs float-right" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="7-tab" data-toggle="tab" href="#7"> 7-223 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="9-tab" data-toggle="tab" href="#9"> 9-116 </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="25-tab" data-toggle="tab" href="#25"> 25-307 </a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="7" role="tabpanel" aria-labelledby="7-tab">123</div>
                    <div className="tab-pane fade" id="9" role="tabpanel" aria-labelledby="9-tab">...</div>
                    <div className="tab-pane fade" id="25" role="tabpanel" aria-labelledby="252-tab">...</div>

                    <Schedule className="row cd-schedule cd-schedule--loading margin-top-lg margin-bottom-lg js-cd-schedule">
                        <div className="col-12 cd-schedule__events">
                            <ul>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span> 시간\요일</span></div>
                                </li>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span>월</span></div>
                                    <ul>
                                        <li className="cd-schedule__event">
                                            <a data-start="10:00" data-end="12:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">확률론</em>
                                            </a>
                                        </li>
                                        <li className="cd-schedule__event">
                                            <a data-start="17:00" data-end="18:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">수치해석학</em>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span>화</span></div>
                                    <ul>
                                        <li className="cd-schedule__event">
                                            <a data-start="11:00" data-end="12:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">해석학</em>
                                            </a>
                                        </li>
                                        <li className="cd-schedule__event">
                                            <a data-start="16:00" data-end="18:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">수치해석학</em>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span>수</span></div>
                                    <ul>
                                        <li className="cd-schedule__event">
                                            <a data-start="9:00" data-end="10:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">산업수학</em>
                                            </a>
                                        </li>
                                        <li className="cd-schedule__event">
                                            <a data-start="18:00" data-end="19:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">해석학</em>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span>목</span></div>
                                    <ul>
                                        <li className="cd-schedule__event">
                                            <a data-start="9:00" data-end="11:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">해석학</em>
                                            </a>
                                        </li>
                                        <li className="cd-schedule__event">
                                            <a data-start="11:00" data-end="12:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">확률론</em>
                                            </a>
                                        </li>
                                        <li className="cd-schedule__event">
                                            <a data-start="16:00" data-end="17:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">수치해석학</em>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="cd-schedule__group">
                                    <div className="cd-schedule__top-info"><span>금</span></div>
                                    <ul>
                                        <li className="cd-schedule__event">
                                            <a data-start="13:00" data-end="15:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                                                <em className="cd-schedule__name">산업수학</em>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="col-12 cd-schedule__timeline">
                            <ul>
                                <li><span>09:00</span></li>
                                <li><span>10:00</span></li>
                                <li><span>11:00</span></li>
                                <li><span>12:00</span></li>
                                <li><span>13:00</span></li>
                                <li><span>14:00</span></li>
                                <li><span>15:00</span></li>
                                <li><span>16:00</span></li>
                                <li><span>17:00</span></li>
                                <li><span>18:00</span></li>
                                <li><span>19:00</span></li>
                                <li><span>20:00</span></li>
                                <li><span>21:00</span></li>
                                <li><span>22:00</span></li>
                            </ul>
                        </div>

                        {/* <div class="cd-schedule-modal">
                        <header class="cd-schedule-modal__header">
                            <div class="cd-schedule-modal__content">
                                <span class="cd-schedule-modal__date"></span>
                                <h3 class="cd-schedule-modal__name"></h3>
                            </div>

                            <div class="cd-schedule-modal__header-bg"></div>
                        </header>

                        <div class="cd-schedule-modal__body">
                            <div class="cd-schedule-modal__event-info"></div>
                            <div class="cd-schedule-modal__body-bg"></div>
                        </div>

                        <a href="#0" class="cd-schedule-modal__close text-replace">Close</a>
                    </div> */}
                    </Schedule>
                </div>
            </div>
        </div>
    )
}

export default Home;