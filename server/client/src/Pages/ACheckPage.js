import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function ACheck(props) {
  const [state, setState] = useState()
  const [reserve, setReserve] = useState([]);
  useEffect(() => {
    getReserve(); 
  }, [])

  function getReserve() {
    axios.get(`/users/admin/${props.match.params.id}`, { 
       headers: { authorization: localStorage.getItem('token') },
    })
      .then(res => {
        if (res.status === 404) {
          alert(res.data.error)
          setState(true);
        }
        console.log(res.data);
        setReserve(res.data);
      })
      .catch(err => {
        alert(err.error)
      });
  }
  if (state) return <Redirect to="/home" />;

  function remove(index) {
    axios.delete(`/reserves/${reserve[index]._id}`)
      .then(res => {
        if (res.status === 404) return alert(res.data.error)
        alert("삭제되었습니다!");
        getReserve();
      })
      .catch(err => {
        alert(err.error)
      });
  };

  function admit(index) {
    axios.put(`/reserves/${reserve[index]._id}`)
      .then(res => {
        if (res.status === 404) return alert(res.data.error)
        alert("승인되었습니다!");
        getReserve();
      })
      .catch(err => {
        alert(err.error)
      });
  };

  return (
    <div>
      <Menu />
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th>대표자</th>
              <th>날짜</th>
              <th>시간</th>
              <th>강의실</th>
              <th>사용인원</th>
              <th>승인여부</th>
            </tr>
          </thead>
          <tbody>
            {reserve.map((reserve, index) => {
              return (
                <tr key={index}>
                  <td>{reserve.user.name}</td>
                  <td>{reserve.date}</td>
                  <td>{reserve.time}</td>
                  <td>{reserve.room}</td>
                  <td>{reserve.num}</td>
                  <td>
                    <button onClick={() => admit(index)} className="btn btn-primary">
                      승인
                    </button>
                    <button onClick={() => remove(index)} className="btn btn-danger">
                      거절
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default ACheck