import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function Check(props) {
    
    function getReserve() {
        axios.get(`/reserves/${props.match.params.id}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                }
                console.log(res.data);
                setReserve(res.data);
            })
            .catch(err => {
                alert(err.error)
            });
    }
    function remove(index) {
        axios.delete(`/reserves/${reserve[index]._id}`)
            .then(res => {
                if (res.status === 404) return alert(res.data.error)
                alert("삭제되었습니다!")
                getReserve();
            })
            .catch(err => {
                alert(err.error)
            });
    };

    const [reserve, setReserve] = useState([]);
    useEffect(() => {
        getReserve();
    }, [])

    return (
        <div>
            <Menu />
            <div className="">check
                <table className="table">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>날짜</th>
                            <th>강의실</th>
                            <th>예약취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserve.map((reserve, index) => {
                            return (
                                <tr key={index}>
                                    <td>{props.match.params.id}</td>
                                    <td>{reserve.name}</td>
                                    <td>{reserve.date}</td>
                                    <td>{reserve.room}</td>
                                    <td>
                                        <button onClick={() => remove(index)} className="btn btn-danger">
                                            취소
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

export default Check
