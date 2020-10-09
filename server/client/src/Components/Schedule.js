import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

function Cal(calledday) {
  const calendarRef = useRef();
  const [day, setDay] = useState(calledday + "15:00:00");
  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    // 'common.creationGuide.color': 'white',
    'common.creationGuide.backgroundColor': 'gray',
    // Theme object to extends default dark theme.
  });

  useEffect(() => {
    const cal = calendarRef.current.getInstance();
    cal.setDate(new Date(day));
    cal.changeView('week', false);
    // cal.today(new Date(day));

    // calendar.on('clickSchedule', function (event) {
    //   const schedule = event.schedule;

    //   if (lastClickSchedule) {
    //     calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
    //       isFocused: false,
    //     });
    //   }
    //   calendar.updateSchedule(schedule.id, schedule.calendarId, {
    //     isFocused: true,
    //   });

    //   lastClickSchedule = schedule;
    //   // open detail view

    //   return (console.log(isFocused))
    // });

  }, [day])

  return (
    <Calendar
      ref={calendarRef}
      height="100%"
      calendars={[
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
      ]}
      disableDblClick={false}
      disableClick={true}
      isReadOnly={false}
      // template={
      //   popupIsAllDay=function {
      //     return display: "none"
      //   }
      // }
      schedules={[
        {
          id: '1',
          calendarId: 'Major Subject',
          category: 'time',
          start: '2020-10-09T11:00:00',
          end: '2020-10-09T12:00:00'
        },
        {
          id: '2',
          calendarId: 'Elective Subject',
          title: '웹 프로그래밍',
          category: 'time',
          start: '2020-10-09T10:00:00',
          end: '2020-10-09T11:00:00'
        },
        {
          id: '3',
          calendarId: 'General Subject',
          title: '영양과 건강',
          category: 'time',
          start: '2020-10-08T11:00:00',
          end: '2020-10-08T15:00:00'
        }
      ]}
      scheduleView={['time']}
      taskView={false}
      theme={myTheme}
      timezones={[
        {
          timezoneOffset: 540
        }
      ]}
      useDetailPopup
      useCreationPopup
      view={"week"}
      week={{
        workweek: true,
        hourStart: 8,
        hourEnd: 23
      }}
    />
  )
}

export default Cal