import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import styled from 'styled-components';

const Ta = styled(Table)`
  margin-top: 0.5em;

  & th, & td {
    padding: 0;
    vertical-align: middle;
    font-size: 0.9rem;
    margin-left : auto; margin-right : auto;
    border-spacing: initial;
  };

  & tr {
    display: d-flex;
    width: 150px;
  };

  & td {
    align-items: center;
    margin: 10px;
  };
`

function Check(props) {
    const [reserve, setReserve] = useState([]);
    const [state, setState] = useState()
    useEffect(() => {
        getReserve();
    }, [])

    if (state) return <Redirect to="/" />;

    function getReserve() {
        axios.get(`/api/reserves/${props.match.params.id}`, {
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
                const reserves = res.data.filter(function(item) {
                        return item !== '';
                      });
                setReserve(reserves);
            })
            .catch(err => {
                alert(err.error)
            });
    }
    function remove(index) {
        axios.delete(`/api/reserves/${reserve[index]._id}`)
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
            <Container fluid>
                <Ta responsive="lg ml-2rem">
                    <thead className="thead-light">
                        <tr>
                            <th className="text-center">날짜</th>
                            <th className="text-center">시간</th>
                            <th className="text-center">강의실</th>
                            <th className="text-center">사용인원</th>
                            {/* <th>승인여부</th> */}
                            <th className="text-center">예약취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserve.map((reserve, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">{reserve.date}</td>
                                    <td className="text-center">{reserve.starttime}시~{(Number(reserve.starttime) + reserve.usetime)}시</td>
                                    <td className="text-center">{reserve.room}</td>
                                    <td className="text-center">{reserve.num}</td>
                                    {/* <td>{reserve.check ? (reserve.approve ? "사용가능" : "사용불가") : "승인대기중"}</td> */}
                                    <td className="text-center">
                                        <button onClick={() => remove(index)} className="btn btn-danger btn-sm">
                                            취소
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Ta>
            </Container>
        </div>
    )
}

export default Check