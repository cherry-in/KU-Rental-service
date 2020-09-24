import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
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
            <div className="container">
                <Drop className="row dropdown">
                    <button className="btn btn-lg dropdown-toggle mx-auto col-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        기간을 선택해주십시오.  
                    </button>
                    <div className="dropdown-menu col-5" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">10 / 5 ~ 10 / 9</a>
                        <a className="dropdown-item" href="#">10 / 12 ~ 10 / 16</a>
                        <a className="dropdown-item" href="#">10 / 19 ~ 10 / 23</a>
                    </div>
                </Drop>
                <Schedule className="row cd-schedule cd-schedule--loading margin-top-lg margin-bottom-lg js-cd-schedule">
                    <div className="col-1 cd-schedule__timeline">
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
                    <div className="col-6 cd-schedule__events">
                        <ul>
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
    )
}

export default Home