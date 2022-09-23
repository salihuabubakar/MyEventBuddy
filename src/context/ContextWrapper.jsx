import React, { useState, useReducer, useMemo, useEffect } from "react";
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = ({children}) => {
  const [daySelected, setDaySelected] = useState();
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
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
         setSelectedEvent(null);
       }
     }, [showEventModal]);
  return (
    <GlobalContext.Provider
      value={{
          daySelected,
          setDaySelected,
          showEventModal,
          selectedEvent,
          savedEvents,
          setSelectedEvent,
          setShowEventModal,
          filteredEvents,
          dispatchCalEvent,
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
