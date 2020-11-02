import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

function Cal(calledday) {
  const calendarRef = useRef(null);
  const [day, setDay] = useState(calledday + "15:00:00");
  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    // 'common.creationGuide.color': 'white',
    'common.creationGuide.backgroundColor': 'gray',
    // Theme object to extends default dark theme.
  });

  function getDataAction(target) {
    return target.dataset ? target.dataset.action : target.getAttribute('data-action');
  }

  function onClickNavi(e) {
    const cal = calendarRef.current.getInstance();
    const action = getDataAction(e.target);
  
    switch (action) {
      case 'move-prev':
        cal.prev();
        break;
      case 'move-next':
        cal.next();
        break;
      case 'move-today':
        cal.today();
        break;
      default:
        return;
    }
  
    // setRenderRangeText();
    // setSchedules();
  }

  function useday(day) {
    const cal = calendarRef.current.getInstance();
    cal.setDate(new Date(day));
    cal.changeView('week', true);
    cal.today(new Date(day));
  }

  useEffect(() => {
    // const cal = calendarRef.current.getInstance();
    // cal.setDate(new Date(day));
    // cal.changeView('week', false);
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
    <div className="container mt-3">
    <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
    <input type="text" id="datepicker-input" aria-label="Date-Time"></input>
    <span class="tui-ico-date"></span>
</div>
<div id="wrapper" style="margin-top: -1px;"></div>

    <Calendar
      ref={calendarRef}
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
            // template={
      //   popupIsAllDay=function {
      //     return display: "none"
      //   }
      // }
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
      view={"week"}
      week={{
        workweek: true,
        hourStart: 8,
        hourEnd: 23
      }}
    />
    </div>
  )
}

export default Cal