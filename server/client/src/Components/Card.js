import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Accordion, Col, AccordionContext, useAccordionToggle, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Text = styled(Card.Body)`
    & .WRAP {
        display: inline-block;
        text-overflow: ellipsis;
        width: 100%;
        white-space: initial;
    }
`

function Notice({ card_id, card_index, title, date, content, admin }) {
    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );

        const isCurrentEventKey = currentEventKey === eventKey;
        return (
            <div
                className={isCurrentEventKey ? "text-wrap whiteSpace-initial" : "text-truncate"}
                onClick={decoratedOnClick}
            >
                {children}
            </div>
        );
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

    function remove (card_id) {
        axios.delete(`/notices/${card_id}`)
            .then(res => {
                if (res.status === 404) return alert(res.data.error)
                alert("삭제되었습니다!");
                window.location.reload();
            })
            .catch(err => {
                alert(err.error)
            });
    }

    return (
        <Card className="w-100">
            <Card.Header className="row flex-row py-3">
                <Col md={10} xs={8} >
                    <ContextAwareToggle variant="link" eventKey={card_index + 1}>{title}</ContextAwareToggle>
                </Col>
                <Col md={2} xs={4} className="p-0" >{dateForm(date)}</Col>
            </Card.Header>
            <Accordion.Collapse eventKey={card_index + 1}>
                <Text>
                    {content.split("\n").map((i, key) => {
                        return <div key={key}>{i}</div>;
                    })}
                    {admin === "admin" ? (
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" size="sm" as={Link} to={`/write/revise/${card_id}`}>수정</Button>
                            <Button variant="danger" size="sm" onClick={() => remove(card_id)}>삭제</Button>
                        </div>) : null}
                </Text>
            </Accordion.Collapse>
        </Card >
    )
}

export default Notice;