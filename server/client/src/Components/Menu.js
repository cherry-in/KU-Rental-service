import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #981e1e;
`

function Menu() {
    return (
        <Nav className="navbar sticky-top navbar-expand-md">
            <Link to="/home" className="navbar-brand">대관 서비스</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
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
            </div>
        </Nav>
    )
}

export default Menu