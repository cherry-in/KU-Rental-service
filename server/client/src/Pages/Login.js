import React, { } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Log = styled.div`
    background-color: #981e1e;
`
const Logo = styled.div`
    background-color: #E76A6A;
`

function Login() {
    return (
        <div className="container-fluid">
            <div className="row">
                <Logo className="col-md-5 col-12">
                    <h2>고려대학교</h2>
                    <h4>대관 시스템</h4>
                </Logo>
                <Log className="col-md-7 col-12">
                    <form encType='multipart/form-data' className="mt-4" style={{ height: "100%" }}>
                        <div className="form-group">
                            <label for="title_input">학번</label>
                            <input className="form-control" id="title_input" name="title" type="text" required />
                        </div>
                        <div className="form-group">
                            <label for="author_input">비밀번호</label>
                            <input className="form-control" id="author_input" name="author" type="text" required />
                        </div>
                        <div className="form-group">
                            <Link to="/home">
                                <button className="btn" type="submit">로그인</button>
                            </Link>
                        </div>
                    </form>
                </Log>
            </div>
        </div>
    )
}

export default Login