import React, { useState, useEffect } from 'react';
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import styled from 'styled-components';

const cal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  top: 64px;
`

// const container = document.getElementById('calendar');
const options = {
  defaultView: 'week',
  taskView: false,
  week: {
    workweek: true
  },
  useCreationPopup: true,
  useDetailPopup: true
};

const calendar = new Calendar('#calendar', options);

calendar.setCalendars([
  {
    id: 'Major Subject',
    name: '전공 필수',
    color: '#ffffff',
    bgColor: '#ff5583',
    dragBgColor: '#ff5583',
    borderColor: '#ff5583'
  },
  {
    id: 'Elective Subject',
    name: '전공 선택',
    color: '#ffffff',
    bgColor: '#ffbb3b',
    dragBgColor: '#ffbb3b',
    borderColor: '#ffbb3b'
  },
  {
    id: 'General Subject',
    name: '일반 교양',
    color: '#ffffff',
    bgColor: '#03bd9e',
    dragBgColor: '#03bd9e',
    borderColor: '#03bd9e'
  }
]);

calendar.createSchedules([
  {
    id: '1',
    calendarId: 'Major Subject',
    title: '자료구조론',
    category: 'time',             
    start: '2020-10-05T11:00:00',
    end: '2020-10-05T12:00:00',
    isReadOnly : true
  },
  {
    id: '2',
    calendarId: 'Elective Subject',
    title: '웹 프로그래밍',
    category: 'allday',
    start: '2020-10-5T10:00:00',
    end: '2020-10-9T11:00:00',
    isReadOnly : true
  },
  {
    id: '3',
    calendarId: 'General Subject',
    title: '영양과 건강',
    category: 'time',
    start: '2020-10-8T11:00:00',
    end: '2020-10-8T15:00:00',
    isReadOnly : true
  }
]);

export default Calendar