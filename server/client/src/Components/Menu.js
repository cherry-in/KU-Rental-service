import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import axios from 'axios';

const MENU = styled(Navbar)`
    background-color: #7B031D;

    a {
        color : white;
    }
`

function Menu() {
    const [state, setState] = useState()
    const [user, setUser] = useState({ role: "" })
    const name = localStorage.getItem('name');

    function logout() {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        setState(true);
    }

    useEffect(() => {
        acheck();
    }, [])

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

    if (state) return <Redirect to="/" />
    return (
        <MENU expand="md" variant="dark">
            <Navbar.Brand href="#">대관 서비스</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink as={Link} to="/notice">공지사항</NavLink>
                    <NavLink as={Link} to="/home">대관 현황</NavLink>

                    <NavLink as={Link} to={{
                        pathname: `/apply/${localStorage.getItem('_id')}`,
                        state: { id: localStorage.getItem('_id') },
                    }} className="nav-link">대관 신청</NavLink>

                    <NavLink as={Link} to={{
                        pathname: `/check/${localStorage.getItem('_id')}`,
                        state: { id: localStorage.getItem('_id') },
                    }} className="nav-link">
                        대관 확인/취소</NavLink>

                    {user.role === "admin" ? (
                        <NavLink as={Link} to={{
                            pathname: `/acheck/${localStorage.getItem('_id')}`,
                            state: { id: localStorage.getItem('_id') },
                        }} className="nav-link">
                            대관 확인/취소(관리자)</NavLink>) : null}
                </Nav>
                <Nav >
                    <NavLink>
                        <small className="d-flex flex-row justify-content-end">
                            <div className="text-white text-right font-weight-light pr-2">{name}님</div>
                            <NavLink className="p-0" as={Link} to={{
                                pathname: `/change/${localStorage.getItem('_id')}`,
                                state: { id: localStorage.getItem('_id') },
                            }}>  비밀번호 변경 </NavLink> / <NavLink className="p-0" onClick={logout} > 로그아웃</NavLink></small>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </MENU >
    )
}

export default Menu