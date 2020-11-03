import React, { useState, useContext } from 'react';
import { Card, Accordion, Col, AccordionContext, useAccordionToggle } from 'react-bootstrap';
import styled from 'styled-components';

const Text = styled(Card.Body)`
    & .WRAP {
        display: inline-block;
        text-overflow: ellipsis;
        width: 100%;
        white-space: initial;
    }
`

function Notice({ card_index, title, date, content }) {
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

    return (
        <Card className="w-100">
            <Card.Header className="row flex-row py-3">
                <Col md={10} xs={8} >
                    <ContextAwareToggle variant="link" eventKey={card_index + 1}>{title}</ContextAwareToggle>
                </Col>
                <Col md={2} xs={4} className="p-0" >{dateForm(date)}</Col>
            </Card.Header>
            <Accordion.Collapse eventKey={card_index + 1}>
                <Text><pre className="text-overflow-ellipsis w-100 white-space-initial">{content}</pre></Text>
            </Accordion.Collapse>
        </Card >
    )
}

export default Notice;