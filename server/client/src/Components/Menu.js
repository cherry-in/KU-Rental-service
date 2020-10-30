import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #7B031D;
    height: 6vh;

    a {
        color: #ffffff;
    }

    & .logoutBtn:hover {
        text-decoration: underline;
    }
`

function Menu() {
    const [state, setState] = useState()
    const [user, setUser] = useState({ role: "" })
    const name = localStorage.getItem('name');

    useEffect(() => {
        acheck();
    }, [])

    if (state) return <Redirect to="/" />;

    function logout() {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        setState(true);
    }

    function acheck() {
        axios.get(`/users/${localStorage.getItem('_id')}`)
            .then(res => {
                if (res.data.role == "admin") {
                    setUser(res.data)
                }
            }).catch(err => {
                alert(err.error)
            });
    }

    return (
        <Nav className="navbar sticky-top navbar-expand-md">
            <a class="navbar-brand" href="#">대관 서비스</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/notice" className="nav-link">공지사항</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">대관 현황</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={{
                            pathname: `/apply/${localStorage.getItem('_id')}`,
                            state: { id: localStorage.getItem('_id') },
                        }} className="nav-link">대관 신청</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={{
                            pathname: `/check/${localStorage.getItem('_id')}`,
                            state: { id: localStorage.getItem('_id') },
                        }} className="nav-link">
                            대관 확인/취소</Link>
                    </li>
                    {user.role === "admin" ? (
                        <li className="nav-item">
                            <Link to={{
                                pathname: `/acheck/${localStorage.getItem('_id')}`,
                                state: { id: localStorage.getItem('_id') },
                            }} className="nav-link">
                                대관 확인/취소(관리자)</Link>
                        </li>) : null}
                </ul>
                <div className="h-100 mr-3">
                    <div className="text-white text-right font-weight-light"><small>{name}님 안녕하세요</small></div>
                    <div className="text-white text-right font-weight-light"><small>
                        <Link to={{
                            pathname: `/change/${user._id}`,
                            state: { id: user._id },
                        }}>비밀번호 변경</Link> / <span className="logoutBtn" onClick={logout} >로그아웃</span></small></div>
                </div>
            </div>
        </Nav>
    )
}

export default Menu