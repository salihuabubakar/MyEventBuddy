import React, { useState, useContext, useReducer, useMemo, useEffect } from "react";
import Header from "./Components/header";
import moment from "moment";
import Calendar from "./Components/calendar/calendar";
import { events as eventData } from "./EventData";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./Components/EventModal";
import { EmptySpace } from "./Components/header/header.style";
import { useGlobalState, setGlobalState } from "./context/GlobalState";
import {
  Event,
  accessors,
  dayPropGetter,
  cellPropGetter,
  eventPropGetter,
  onDragStart,
  onKeyPressEvent,
  onSelecting,
  initEvents,
  savedEventsReducer,
} from "./utils";

const App = () => {
  const now = () => new Date();

  let selectTimeout;

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const [showEventModal] = useGlobalState("showEventModal");

  const [dayEvents, setDayEvents] = useState([]);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents;
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);
  useEffect(() => {
    if (!showEventModal) {
      setGlobalState("selectedEvent", "")
    }
  }, [showEventModal]);

  const [events, setEvents] = useState();

  useEffect(() => {
    savedEvents.map((event) => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      return event;
    });
    setEvents(savedEvents);
  }, [savedEvents]);


  const [date, setDate] = useState(now());
  const [view, setView] = useState("week");

  const onNavigate = (newDate) => setDate(newDate);
  const onView = (newView) => setView(newView);

  const onSelectSlot = ({ start, end, action }) => {
    console.log("PopUp EVents Trigger");
    setSelectedStartDate(start);
    setSelectedEndDate(end)
    setGlobalState("showEventModal", true);
    console.log("onSelectSlot: ", { start, end, action });
    console.log(start);
  };

  console.log("DaySelected...", selectedStartDate);

  // let strDateTime = selectedStartDate;
  // let myDate = new Date(strDateTime);
  // console.log("converted date", myDate.toUTCString());

  const onSelectEvent = (event) => {

    setGlobalState("selectedEvent", event);
    setGlobalState("showEventModal", true);

    console.log("OnselectEvent: ", event);
  };

  const onDoubleClickEvent = (event) => {
    selectTimeout && window.clearTimeout(selectTimeout);

    selectTimeout = setTimeout(() => {
      console.log("onDoubleClickEvent: ", event);
    }, 250);
  };

  // const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
  //   let allDay = event.allDay;

  //   if (!event.allDay && droppedOnAllDaySlot) {
  //     allDay = true;
  //   } else if (event.allDay && !droppedOnAllDaySlot) {
  //     allDay = false;
  //   }

  //   const updatedEvent = { ...event, start, end, allDay };

  //   setEvents((prevEvents) => {
  //     const filtered = prevEvents.filter((it) => it.id !== event.id);
  //     return [...filtered, updatedEvent];
  //   });

  //   // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  // };

  // const resizeEvent = ({ event, start, end }) => {
  //   setEvents((prevEvents) => {
  //     const filtered = prevEvents.filter((it) => it.id !== event.id);
  //     return [...filtered, { ...event, start, end }];
  //   });

  //   //alert(`${event.title} was resized to ${start}-${end}`)
  // };

  let today = moment();
  let pm8 = today.set("hour", 21).set("minutes", 0).toDate();
  let am8 = today.set("hour", 8).set("minutes", 0).toDate();

  const ErrorMessage = () => {
    return  <h1>No Events in this ranges</h1>;
  }

  return (
    <React.Fragment>
      {showEventModal && (
        <EventModal
          dispatchCalEvent={dispatchCalEvent}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
        />
      )}
      <EmptySpace />
      <Calendar
        {...{
          events,
          date,
          onNavigate,
          view,
          onView,
          onSelectSlot,
          onSelectEvent,
          onSelecting,
          onDoubleClickEvent,
          onKeyPressEvent,
          dayPropGetter,
          cellPropGetter,
          eventPropGetter,
        }}
        // onEventDrop={moveEvent}
        // onEventResize={resizeEvent}
        getNow={now}
        min={am8}
        max={pm8}
        {...accessors}
        popup={true}
        selectable={true}
        components={{
          toolbar: Header,
          event: Event,
        }}
        messages={{
          noEventsInRange: `oops! No Schedules available in this range`,
          date: "Date Header",
          time: "Time Header",
          event: "Shift Header"
        }}
      />
    </React.Fragment>
  );
};

export default App;
