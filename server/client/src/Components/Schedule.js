import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import axios from 'axios';

function Cal(props) {
  const calendarRef = useRef();
  const [reserve, setReserve] = useState([]);
  // const [day, setDay] = useState(props.calledday);
  const [day, setDay] = useState(props.day);
  const [myTheme, setMyTheme] = useState({
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    // 'common.creationGuide.color': 'white',
    'common.creationGuide.backgroundColor': 'gray',
    // Theme object to extends default dark theme.
  });

  const yj = [
    {
      id: 'a',
      calendarId: 'Subject',
      category: 'time',
      start: '2020-10-27T11:00:00',
      end: '2020-10-27T12:00:00',
    },
    {
      id: 'b',
      calendarId: 'Subject',
      category: 'time',
      start: '2020-10-28T10:00:00',
      end: '2020-10-28T11:00:00',
    },
    {
      id: '3',
      calendarId: 'Subject',
      category: 'time',
      start: '2020-10-29T11:00:00',
      end: '2020-10-29T15:00:00',
    }
  ]

  function getReserve(room) {
    console.log("room", room)
    // setReserve({
    //   id: room,
    //   calendarId: 'Subject',
    //   category: 'time',
    // })

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
        // console.log("room list",res.data);
      })
      .catch(err => {
        alert(err.error)
      });
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

    // setReserve([
    //   {
    //         id: '3',
    //         calendarId: 'Subject',
    //         category: 'time',
    //         start: '2020-10-29T11:00:00',
    //         end: '2020-10-29T15:00:00',
    //       }
    // ])
    getReserve(props.room);
  }, [day])

  return (
    <div>{
      console.log("reserve", reserve)}
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
        // template={
        //   popupIsAllDay=function {
        //     return display: "none"
        //   }
        // }
        schedules={ reserve
          // reserve.map(item=>({id: item._id,
          //   start: item.start,
          //   end: item.end,
          //   calendarId: 'Subject',
          //   category: 'time',}))
          // [
          //   {
          //     id: 'a',
          //     calendarId: 'Subject',
          //     category: 'time',
          //     start: '2020-10-27T11:00:00',
          //     end: '2020-10-27T12:00:00',
          //   },
          //   {
          //     id: 'b',
          //     calendarId: 'Subject',
          //     category: 'time',
          //     start: '2020-10-28T10:00:00',
          //     end: '2020-10-28T11:00:00',
          //   },
          //   {
          //     id: '3',
          //     calendarId: 'Subject',
          //     category: 'time',
          //     start: '2020-10-29T11:00:00',
          //     end: '2020-10-29T15:00:00',
          //   }
          // ]
        }
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