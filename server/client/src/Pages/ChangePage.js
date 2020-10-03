import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';

function Change() {
  // const [state, setState] = useState(false);

  // if (state) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
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
          axios.put(`/users`, { ...values, id: localStorage.getItem('id') },
          )
            .then(res => {
              console.log(res.data);
              if (res.status === 404) return alert(res.data.error)
              alert("회원정보가 수정되었습니다!")
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
            <div className="row justify-content-center align-items-center">
              <form onSubmit={handleSubmit} className="col-sm-3">
                <div className="form-group mb-4">
                  <input
                    className={(touched.password && errors.password ? 'form-control is-invalid' : "form-control")}
                    type="password"
                    name="password"
                    {...getFieldProps('password')}
                    placeholder="새 비밀번호를 입력해주세요."
                  />
                  {touched.password && errors.password ? (
                    <div className="invalid-feedback text-left">{errors.password}</  div>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <input
                    className={(touched.password2 && errors.password2 ? 'form-control is-invalid' : "form-control")}
                    type="password"
                    name="password2"
                    {...getFieldProps('password2')}
                    placeholder="새 비밀번호를 다시 입력해주세요."
                  />
                  {touched.password2 && errors.password2 ? (
                    <div className="invalid-feedback text-left">{errors.password2}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-light" disabled={isSubmitting}>저장</button>
                <button class="btn btn-light"><Link to="/login">로그인</Link></button>
              </form>
            </div>
          )}
      </Formik>
    </div >
  );
}


export default Change;