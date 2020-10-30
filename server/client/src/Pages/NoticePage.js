import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import styled from 'styled-components';

function Notice() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getNotice();
    }, []);

    function dateForm(day) {
        const post_day = new Date(day);
        let year = post_day.getFullYear();
        let month = post_day.getMonth() + 1;
        let date = post_day.getDate();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        const new_date = year + "-" + month + "-" + date;
        return new_date
    }

    function getNotice() {
        axios.get(`/notices`)
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                }
                console.log(res.data);
                setNotices(res.data);
            })
            .catch(err => {
                alert(err.error)
            });
    }
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="row justify-content-center vw-100 vh-90">
                    <div className="col-md-7 col-12">

                        <h2 className="p-3 border-bottom">공지사항</h2>

                        <div id="accordion pt-1">
                        <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
                            {/* {notices.map((notice, index) =>
                                <div className="card">
                                    <div className="card-header" id={"Hnotice_" + index}>
                                        <div className="row card-link collapsed" data-toggle="collapse" data-target={"#notice_" + index} aria-expanded="false" aria-controls={"notice_" + index}>
                                            <div className="col-6 p-0">{notice.notice_title}</div>
                                            <div className="col-3 p-0 text-center">{notice.notice_author}</div>
                                            <div className="col-3 p-0 text-right">{dateForm(notice.post_date)}</div>
                                        </div>
                                    </div>
                                    <div id={"notice_" + index} aria-labelledby={"Hnotice_" + index} className="collapse" data-parent="#accordion">
                                        <div className="card-body">{notice.notice_content}</div>
                                    </div>
                                </div>
                            )} */}
                        </div>

                    </div>
                </div >
            </div >
        </div>
    )
}

export default Notice