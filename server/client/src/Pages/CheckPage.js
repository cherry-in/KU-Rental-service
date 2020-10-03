import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import List from '../Components/List';
import axios from 'axios';

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

    const [reserve, setReserve] = useState([]);
    useEffect(() => {
        getReserve();
    }, [])
    return (
        <div>
            <Menu />
            <div className="container">check
            {reserve.map((reserve, index) =>
                <List id={props.match.params.id} index={index} date={reserve.date} name={reserve.name} room={reserve.room} time={reserve.time} num={reserve.num} _id={reserve._id}/>
            )}
            </div>
        </div>
    )
}

export default Check