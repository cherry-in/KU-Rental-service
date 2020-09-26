import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #981e1e;
`

function Menu() {
    const [state, setState] = useState()
    const name = localStorage.getItem('name');

    if (state) return <Redirect to="/" />;

    function logout() {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        setState(true);
    }

    return (
        <Nav className="navbar sticky-top navbar-expand-md">
            <Link to="/home" className="navbar-brand">대관 서비스</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">대관 현황</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/apply" className="nav-link">대관 신청</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/check" className="nav-link">대관 확인/취소</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/notice" className="nav-link">공지사항</Link>
                    </li>
                </ul>
                <div>
                    <div>{name}님 안녕하세요.</div>
                    <button onClick={logout} type="button">로그아웃</button>
                    <button><Link to="/signup">회원가입</Link></button>
                </div>
            </div>
        </Nav>
    )
}

export default Menu