import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';

function Notice() {
    const [show, setShow] = useState(false);
    const [notices, setNotices] = useState([]);
    const [user, setUser] = useState({ role: "" })
    const [state, setState] = useState()

    useEffect(() => {
        acheck();
        getNotice();
    }, []);

    if (state) return <Redirect to="/" />;

    function acheck() {
        axios.get(`/users/${localStorage.getItem('_id')}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
            .then(res => {
                if (res.status !== 201) {
                    alert(res.data.error);
                    localStorage.clear();
                    setState(true);
                }
                if (res.data.role == "admin") {
                    setUser(res.data)
                }
            }).catch(err => {
                alert(err.error)
            });
    }

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
                    // alert(res.data.error);
                }
                setNotices(res.data);
            })
            .catch(err => {
                alert(err.error)
            });
    }

    return (
        <div>
            <Menu />
            <Container fluid>
                <Row className="justify-content-center vw-100 vh-90">
                    <Col md={7}>
                        <div className="px-3 pt-3 mb-3 border-bottom d-flex justify-content-between align-items-end">
                            <h2>공지사항</h2>
                            {user.role === "admin" ? (
                                <Link to="/write">글 작성</Link>) : null}
                        </div>
                        <Accordion>
                            {notices.map((notice, index) =>
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <Accordion.Toggle as={Button} variant="link" eventKey={index + 1} className={"d-inline-block " + (show ? "text-wrap" : "text-truncate")} onClick={() => setShow(!show)}>{notice.notice_title}</Accordion.Toggle>
                                        <span className="d-flex align-items-center" style={{ width: "50%" }}>{dateForm(notice.post_date)}</span>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index + 1}>
                                        <Card.Body><pre>{notice.notice_content}</pre></Card.Body>
                                    </Accordion.Collapse>
                                </Card>)}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Notice;