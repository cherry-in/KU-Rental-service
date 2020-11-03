import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import CARD from '../Components/Card';

function Notice() {
    const [user, setUser] = useState({ role: "" })
    const [notices, setNotices] = useState([]);

    // const [show, setShow] = useState(false);

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
                        <h2 className="p-3 border-bottom d-flex justify-content-between">공지사항 {user.role === "admin" ? (
                            <Button as={Link} to="/write">글 작성</Button>) : null}</h2>
                        <Accordion>
                            {notices.map((notice, index) => <CARD card_index={index} title={notice.notice_title} date={notice.post_date} content={notice.notice_content} />
                            )}
                            {/* <Card>
                                    <Card.Header className="d-flex justify-content-space-between">
                                        <Accordion.Toggle as={Button} variant="link" eventKey={index + 1} className={"d-inline-block " + (show ? "text-wrap" : "text-truncate")} onClick={() => setShow(!show)}>{notice.notice_title}</Accordion.Toggle>
                                        <span className="d-flex align-items-center" style={{ width: "50%" }}>{dateForm(notice.post_date)}</span>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index + 1}>
                                        <Card.Body><pre>{notice.notice_content}</pre></Card.Body>
                                    </Accordion.Collapse>
                                </Card> */}

                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Notice;