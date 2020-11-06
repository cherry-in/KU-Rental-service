import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import moment from 'moment';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap';
import leftArrow from '../caret-left-fill.svg';
import rightArrow from '../caret-right-fill.svg';

function Cal(props) {
  const calendarRef = useRef(null);
  const [reserve, setReserve] = useState([]);
  const [period, setPeriod] = useState();
  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    'common.creationGuide.backgroundColor': 'gray',
  });

  function getReserve(room) {
    axios.get(`/app/rental/api/reserves/room/${room}`, {
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
    let html = [];
    html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
    html.push(' ~ ');
    html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
    setPeriod(html.join(''))
  }

  useEffect(() => {
    setRenderRangeText();
    getReserve(props.room);
  }, [props.room])

  return (
    <div>
      <div id="menu" className="p-2">
        <span id="menu-navi" onClick={(e) => onClickNavi(e)}>
          <Button variant="default" size="sm" className="move-today" data-action="move-today">Today</Button>
          <Button variant="default" size="sm" className="move-day" data-action="move-prev">
            <Image class="calendar-icon" src={leftArrow} data-action="move-prev"></Image>
          </Button>
          <Button variant="default" size="sm" className="move-day" data-action="move-next">
            <Image className="calendar-icon" src={rightArrow} data-action="move-next"></Image>
          </Button>
        </span>
        <span id="renderRange" className="render-range ml-2" style={{ height: "5em" }}>{period}</span>
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