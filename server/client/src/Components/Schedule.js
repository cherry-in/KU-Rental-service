import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import moment from 'moment';
import axios from 'axios';

function Cal(props) {
  const calendarRef = useRef(null);
  const [reserve, setReserve] = useState([]);
  const [period, setPeriod] = useState();
  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    // 'common.creationGuide.color': 'white',
    'common.creationGuide.backgroundColor': 'gray',
    // Theme object to extends default dark theme.
  });

  function getReserve(room) {
    axios.get(`/reserves/room/${room}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(res => {
        const reserves = res.data.map(item => ({
          id: item._id,
          start: item.start,
          end: item.end,
          calendarId: 'Subject',
          category: 'time',
        }))
        console.log("room list", res.data);
        setReserve(reserves);
      })
      .catch(err => {
        alert(err.error)
      });
  }

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

    setRenderRangeText();
  }

  function setRenderRangeText() {
    const cal = calendarRef.current.getInstance();
    // const renderRange = document.getElementById('renderRange');
    let html = [];
    html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
    html.push(' ~ ');
    html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
    setPeriod(html.join(''))
    // cal.render();
  }

  useEffect(() => {
    setRenderRangeText();
    getReserve(props.room);
  }, [])

  return (
    <div>
      <div id="menu">
        <span id="menu-navi" onClick={(e) => onClickNavi(e)}>
          <button type="button" className="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
          <button type="button" className="btn btn-default btn-sm move-day" data-action="move-prev">
            <i class="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
          </button>
          <button type="button" className="btn btn-default btn-sm move-day" data-action="move-next">
            <i className="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
          </button>
        </span>
        <span id="renderRange" className="render-range" style={{ height: "5em" }}>{period}</span>
      </div>
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
        isReadOnly={true}
        // template={
        //   popupIsAllDay=function {
        //     return display: "none"
        //   }
        // }
        schedules={reserve}
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