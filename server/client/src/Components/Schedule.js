import React, { useState, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

function Cal() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(new Date().setMinutes(start.getMinutes() + 30)));;

  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
  });

  // Calendar.prototype.openCreationPopup = function (schedule) {
  //   if (this._openCreationPopup) {
  //     this._openCreationPopup(schedule);
  //   }
  // };

  return (
    <Calendar
      height="100%"
      calendars={[
        {
          id: 'Subject',
          bgColor: '#a9a9a9',
          borderColor: '#a9a9a9',
          isReadOnly: 'true'
        }
      ]}
      
      view="week"
      disableDblClick={false}
      disableClick={true}
      isReadOnly={false}
      schedules={[
        {
          id: '1',
          calendarId: 'Subject',
          category: 'time',
          start: '2020-10-05T11:00:00',
          end: '2020-10-05T12:00:00',
        },
        {
          id: '2',
          calendarId: 'Subject',
          category: 'time',
          start: '2020-10-09T10:00:00',
          end: '2020-10-09T11:00:00',
        },
        {
          id: '3',
          calendarId: 'Subject',
          category: 'time',
          start: '2020-10-08T11:00:00',
          end: '2020-10-08T15:00:00',
        }
      ]}

      scheduleView={['time']}
      taskView={false}
      theme={myTheme}
      timezones={[
        {
          timezoneOffset: 540,
          displayLabel: 'GMT+09:00',
          tooltip: 'Seoul'
        },
      ]}
      useDetailPopup
      useCreationPopup
      week={{
        hourStart: 8,
        hourEnd: 23,
        workweek: true
      }}
    />
  )
}

export default Cal