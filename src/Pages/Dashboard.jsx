import React, { useState, useContext, useReducer, useMemo, useEffect } from "react";
import Header from "../Components/header";
import moment from "moment";
import Calendar from "../Components/calendar/calendar";
import { events as eventData } from "../EventData";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "../Components/EventModal";
import { useGlobalState, setGlobalState } from "../context/GlobalState";
import {
  Event,
  accessors,
  dayPropGetter,
  eventPropGetter,
  onDragStart,
  onKeyPressEvent,
  onSelecting,
  initEvents,
  savedEventsReducer,
} from "../utils";
import useCurrentUser from "../hook/getCurrentUser";
import { baseUrl } from "./Login";
import { account } from "../appwrite";
import HeaderNav from "../Components/HeaderNav/haderNav";

const Dashboard = () => {
  const { currentUser } = useCurrentUser();
  const now = () => new Date();

  let selectTimeout;

  console.log("Profile::-", currentUser);

  console.log("path::-", window.location.href);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isVerifiying, setIsVerified] = useState(false);

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
      setGlobalState("selectedEvent", "");
      setSelectedStartDate(null);
      setSelectedEndDate(null)
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
  const [view, setView] = useState("month");

  const onNavigate = (newDate) => setDate(newDate);
  const onView = (newView) => setView(newView);

  const onSelectSlot = ({ start, end, action }) => {
    console.table([start, end])
    setSelectedStartDate(start);
    setSelectedEndDate(end)
    setGlobalState("showEventModal", true);
  };


  console.log("startt::", selectedStartDate);

  const onSelectEvent = (event) => {
    setGlobalState("selectedEvent", event);
    setGlobalState("showEventModal", true);
  };

  const onDoubleClickEvent = (event) => {
    selectTimeout && window.clearTimeout(selectTimeout);

    selectTimeout = setTimeout(() => {
      console.log("onDoubleClickEvent: ", event);
    }, 250);
  };

  const handleEmailVerification = async () => {
    try {
      setIsVerified(true);
      await account.createVerification(`${baseUrl}/verify`);
    } catch (error) {
      console.error(error)
      console.log(error);
      setIsVerified(false);
    }
  }

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

  //   alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  // };

  // const resizeEvent = ({ event, start, end }) => {
  //   setEvents((prevEvents) => {
  //     const filtered = prevEvents.filter((it) => it.id !== event.id);
  //     return [...filtered, { ...event, start, end }];
  //   });

  //   alert(`${event.title} was resized to ${start}-${end}`)
  // };

  let today = moment();
  let pm8 = today.set("hour", 21).set("minutes", 0).toDate();
  let am8 = today.set("hour", 8).set("minutes", 0).toDate();

  if ((currentUser && !currentUser?.emailVerification)) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p>Your email is not verifeid</p>
        <button 
          className="w-fit bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full" 
          size="sm" 
          onClick={handleEmailVerification}
        >
          {isVerifiying ? "Please check your mail" : "Click to Verify"}
        </button>
      </div>
    )
  }

  return (
    <React.Fragment>
      <HeaderNav />
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
      {showEventModal && (
        <EventModal
          dispatchCalEvent={dispatchCalEvent}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
        />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
