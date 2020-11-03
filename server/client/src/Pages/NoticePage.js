import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';

function Notice() {
    const [notices, setNotices] = useState([]);
    const [user, setUser] = useState({ role: "" })

    useEffect(() => {
        acheck();
        getNotice();
    }, []);

    function acheck() {
        axios.get(`/users/${localStorage.getItem('_id')}`)
            .then(res => {
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
                        <div className="p-3 border-bottom justify-content space-between">
                            <div>
                                <h2>공지사항</h2>
                            </div>
                            <div>
                                {user.role === "admin" ? (
                                    <Link to="/write">글 작성</Link>) : null}
                            </div>
                        </div>
                        <Accordion>
                            {notices.map((notice, index) =>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>{notice.notice_title} <span className="text-right">{dateForm(notice.post_date)}</span></Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index + 1}>
                                        <Card.Body>{notice.notice_content}</Card.Body>
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