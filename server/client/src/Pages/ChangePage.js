import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
<<<<<<< HEAD
=======
import Menu from '../Components/Menu';
>>>>>>> origin/hyj
import { Link, Redirect } from 'react-router-dom';
import { Container, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Check = styled.div`
  

  & #reCheck::after {
    content: '새로운 비밀번호를 다시 입력하세요';
  }

  & #reCheck:not(.right) {
    content: '비밀번호가 일치하지 않습니다.';
    color: red;
  }
`

function Change(props) {
  const [state, setState] = useState();
  const [checkPw, setCheckPw] = useState(true);

  if (state) {
    return <Redirect to="/" />;
  }
  // console.log(props)
  return (
    <div className="">
      <Menu />
      <Container fluid className="p-0 vh-90">
        <Check className="row justify-content-center m-0">
          <Col md={4} className="pt-5">
            <Formik
              initialValues={{ password: '' }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required('비밀번호를 입력해주세요.')
                  .min(8, '8자 이상 입력해주세요.'),
                password2: Yup.string()
                  .required('비밀번호를 다시 입력해주세요.')
                  .min(8, '8자 이상 입력해주세요.')
                  .oneOf([Yup.ref("password"), null], '비밀번호가 일치하지 않습니다.'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                axios.put(`/users/change/${props.location.state.id}`, { ...values },
                )
                  .then(res => {
                    console.log(res.data);
                    if (res.status === 404) return alert(res.data.error)
                    alert("회원정보가 수정되었습니다!")
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
                  <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="form-group">
                      <div className={touched.password && errors.password ? "text-danger" : ""}>새 비밀번호를 입력하세요(8자리 이상)</div>
                      <input
                        className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                        type="password"
                        name="password"
                        {...getFieldProps('password')}
                        placeholder="새로운 비밀번호"
                      />
                    </div>

                    <div className="form-group">
                      {touched.password2 && errors.password2 ? setCheckPw(false) : null}
                      <div id="reCheck" className={checkPw ? "right" : "err"}></div>
                      <input
                        className={(touched.password2 && errors.password2 ? 'form-control is-invalid' : "form-control")}
                        type="password"
                        name="password2"
                        {...getFieldProps('password2')}
                        placeholder="새 비밀번호를 다시 입력해주세요."
                      />
                    </div>
                    <Button type="submit" variant="secondary" disabled={isSubmitting}>저장하기</Button>
                  </form>
                )}
            </Formik>
          </Col>

        </Check>

      </Container>
    </div >
  );
}


export default Change;
