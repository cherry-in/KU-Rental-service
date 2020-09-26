import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import { Link, Redirect } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Menu />
            <div className="container">
                home
                <button><Link to="/login">로그인</Link></button>
                <button><Link to="/signup">회원가입</Link></button>
            </div>
        </div>
    )
}

export default Home