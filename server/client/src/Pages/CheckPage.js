import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Check(props) {
    const [reserve, setReserve] = useState([]);
    const [state, setState] = useState()
    useEffect(() => {
        getReserve();
    }, [])

    if (state) return <Redirect to="/" />;

    function getReserve() {
        axios.get(`/reserves/${props.match.params.id}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status === 404) {
                    alert(res.data.error);
                }
                if (res.status === 419) {
                    alert(res.data.error);
                    localStorage.clear();
                    setState(true);
                }
                console.log(res.data);
                const reserves=res.data.filter(function(item) {
                        return item !== '';
                      });
                setReserve(reserves);
            })
            .catch(err => {
                alert(err.error)
            });
    }
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

    return (
        <div>
            <Menu />
            <div className="">
                <table className="table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>시간</th>
                            <th>강의실</th>
                            <th>사용인원</th>
                            <th>승인여부</th>
                            <th>예약취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserve.map((reserve, index) => {
                            return (
                                <tr key={index}>
                                    <td>{reserve.date}</td>
                                    <td>{reserve.starttime}시~{(Number(reserve.starttime) + reserve.usetime)}시</td>
                                    <td>{reserve.room}</td>
                                    <td>{reserve.num}</td>
                                    <td>{reserve.check ? (reserve.approve ? "사용가능" : "사용불가") : "승인대기중"}</td>
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
