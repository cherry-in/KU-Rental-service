import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MENU = styled(Navbar)`
    background-color: #7B031D;
    
`

function Menu() {
    const [state, setState] = useState()
    const name = localStorage.getItem('name');

    function logout() {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        setState(true);
    }

    if (state) return <Redirect to="/" />
    return (
        <MENU expand="md" variant="dark">
            <Navbar.Brand href="#">대관 서비스</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/notice">공지사항</Link></Nav.Link>
                    <Nav.Link><Link to="/home">대관 현황</Link></Nav.Link>
                    <Nav.Link><Link to={{
                        pathname: `/apply/${localStorage.getItem('_id')}`,
                        state: { id: localStorage.getItem('_id') },
                    }} className="nav-link">대관 신청</Link></Nav.Link>
                    <Nav.Link><Link to={{
                        pathname: `/check/${localStorage.getItem('_id')}`,
                        state: { id: localStorage.getItem('_id') },
                    }} className="nav-link">
                        대관 확인/취소</Link></Nav.Link>
                    <Nav.Link><Link to={{
                        pathname: `/acheck/${localStorage.getItem('_id')}`,
                        state: { id: localStorage.getItem('_id') },
                    }} className="nav-link">
                        대관 확인/취소(관리자)</Link></Nav.Link>
                    <Nav.Link>
                        <div className="text-white text-right font-weight-light"><small>{name}님</small></div>

                        <div className="text-white text-right font-weight-light"><small>
                            <Link to={{
                                pathname: `/change/${localStorage.getItem('_id')}`,
                                state: { id: localStorage.getItem('_id') },
                            }}>비밀번호 변경</Link> / <span className="logoutBtn" onClick={logout} >로그아웃</span></small></div>
                    </Nav.Link>
                </Nav>

            </Navbar.Collapse>

            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
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
                    <li className="nav-item">
                        <Link to={{
                            pathname: `/acheck/${localStorage.getItem('_id')}`,
                            state: { id: localStorage.getItem('_id') },
                        }} className="nav-link">
                            대관 확인/취소(관리자)</Link>
                    </li>
                </ul>
                <div className="h-100 mr-3">
                    <div className="text-white text-right font-weight-light"><small>{name}님 안녕하세요</small></div>
                    <div className="text-white text-right font-weight-light"><small>
                        <Link to={{
                            pathname: `/change/${localStorage.getItem('_id')}`,
                            state: { id: localStorage.getItem('_id') },
                        }}>비밀번호 변경</Link> / <span className="logoutBtn" onClick={logout} >로그아웃</span></small></div>
                </div>
            </div> */}
        </MENU >
    )
}

export default Menu