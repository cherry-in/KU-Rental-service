import React, { useState, useEffect } from 'react';
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";

const calendar = new Calendar('#calendar', {
    defaultView: 'week',
  //   useCreationPopup: true,
  //   useDetailPopup: true
  });
  
  calendar.createSchedules([
      {
        id: '1',
        calendarId: 'Major Lecture',
        title: '자료 구조',
        category: 'time',
        start: '2018-11-20T10:30:00',
        end: '2018-11-20T12:30:00'
      },
      {
        id: '2',
        calendarId: 'General Lecture',
        title: '건강과 영양',
        category: 'time',
        dueDateClass: '',
        start: '2018-11-20T14:30:00',
        end: '2018-11-20T16:30:00',
        isReadOnly: true // schedule is read-only
      }
    ]);

calendar.render();
    
export default Calendar