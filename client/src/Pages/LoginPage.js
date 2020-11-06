import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Logo from '../icon.png';
import { Container, Row, Button } from 'react-bootstrap';

const Col_1 = styled.div`
    background-color: #7B031D;

    &.web {
        display : flex;
        align-items: center;
    }

    &.mobile {
        height : 20vh;
        display : flex;
        padding:0;
    }
    
    & .mob-head {
        display: flex;
        flex-direction: row;
        height : 100%;
        width: 100%;
        justify-content: space-evenly;
    }

    & .mob-img {
        max-width: 30vw;
    }
`

const Col_2 = styled.div`
    background-color: rgb(239, 218, 200);

    a {
        color : #7B031D;
    }

    & .mob-formik {
        height : 80vh;
        width: 100%;
        display: flex; 
        justify-content: center;
        align-items: center; 
    }

    & .web-form {
        height: 100%;
        display: flex; 
        align-items: center; 
        justify-content: center;
    }

    & .mob-container {
        display: flex;
        flex-direction: column;
    }

    & .webb {
        flex-direction: column;
    }

    & .web-container {
        display: flex;
        height: 12vh;
        width: 30vw;
    }

    & .web-input-form {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    & .mob-input-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

    }
`

function Login() {
    const [state, setState] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 960) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }, []);

    if (state) {
        return <Redirect to="/home" />;
    }
    return (
        <Container fluid className="p-0">
            <Row className="vw-100 vh-100 m-0 " >
                <Col_1 className={"col-md-4 col-12" + (mobile ? " mobile" : " web")}>
                    <div className={mobile ? "mob-head" : ""}>
                        <img className={mobile ? "mob-img" : "img-fluid"} src={Logo} />
                        <div className={"d-flex " + (mobile ? "align-items-center" : "justify-content-center")}>
                            <h1 className="font-weight-bold text-white text-center">고려대학교<br />대관 서비스</h1>
                        </div>
                    </div>
                </Col_1>
                <Col_2 className="col-md-8 col-12" >
                    <Formik
                        initialValues={{ id: '', password: '' }}
                        validationSchema={Yup.object({
                            id: Yup.string()
                                .required('학번을 입력해주세요.'),
                            password: Yup.string()
                                .required('비밀번호를 입력해주세요.')
                                .min(8, '8자 이상 입력해주세요.'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            axios({
                                method: 'post',
                                url: '/api/login',
                                data: values,
                            }).then(res => {
                                if (res.status === 404) return alert(res.data.error)

                                localStorage.setItem('token', res.data.token);
                                localStorage.setItem('_id', res.data.users._id);
                                localStorage.setItem('name', res.data.users.name);
                                setState(true);
                            })
                                .catch(err => {
                                    alert(err.error)
                                });

                            setTimeout(() => {
                                setSubmitting(false);
                            }, 400);  // finish the cycle in handler
                        }}
                    >
                        {({
                            errors,
                            touched,
                            handleSubmit,
                            getFieldProps,  // contain values, handleChange, handleBlur
                            isSubmitting,
                        }) => (
                                <div className={mobile ? " mob-formik p-0" : " web-form"}>
                                    <form onSubmit={handleSubmit} className={mobile ? "w-75" : "d-flex webb"}>
                                        <div className={mobile ? "mob-container" : "web-container"}>
                                            <div className={mobile ? "mob-input-form" : "web-input-form mr-2"}>
                                                <div className={"form-group m-0" + (mobile ? " mb-2" : " ")}>
                                                    <input
                                                        className={(touched.id && errors.id ? 'form-control is-invalid' : "form-control")}
                                                        type="text"
                                                        name="id"
                                                        {...getFieldProps('id')}
                                                        placeholder="Input Student Id"
                                                    />
                                                </div>
                                                <div className={"form-group m-0"+ (mobile ? " mb-2" : " ")}>
                                                    <input
                                                        className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                                                        type="password"
                                                        name="password"
                                                        {...getFieldProps('password')}
                                                        placeholder="Input Password"
                                                    />
                                                </div>
                                            </div>
                                            <Button type="submit" variant="dark" className={mobile ? " w-100" : " w-20"} disabled={isSubmitting}> Login </Button>
                                        </div>
                                        <div><Link to="/find">비밀번호를 잊으셨나요?</Link></div>
                                        <div><Link to="/signup">회원이 아니신가요?</Link></div>
                                    </form>
                                </div>
                            )}
                    </Formik>
                </Col_2>
            </Row>
        </Container>
    )
}

export default Login