import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import CARD from '../Components/Card';

function Notice() {
    const [show, setShow] = useState(false);
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
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Notice;