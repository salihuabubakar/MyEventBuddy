import checkIcon from "./img/check-mark.png";
import { EventContainer } from "./Components/EventModal/EventModal.style"

export const accessors = {
  draggableAccessor: (event) => !event.blocked,
  resizableAccessor: (event) => !event.blocked,
};

export const dayPropGetter = (date) => {
  let currentDate = `${new Date().getDate()} ${
    new Date().getMonth() + 1
  } ${new Date().getFullYear()}`;
  let allDate = `${date.getDate()} ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
  if (currentDate === allDate)
    return {
      style: {
        borderRadius: "4px",
        backgroundColor: "#fff",
      },
    };
  return {
    style: {
      backgroundColor: "#fff",
      textAlign: "center",
    },
  };
};

export const eventPropGetter = (event) => {
  const backgroundColor = event.hexCodeColor;
  let newStyle = {
    backgroundColor: backgroundColor,
    color: "white",
    borderRadius: "5px;",
    border: "none",
    outLine: "none",
    fontWeight: "bold",
    borderLeft: "2px solid #326872",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  };
  return {
    className: "",
    style: newStyle,
  };
};

export const onKeyPressEvent = ({ event, ...other }) => {
  console.log("[onKeyPressEvent] - event", event);
  console.log("[onKeyPressEvent] - other", other);
};

export const onDragStart = ({ event, action }) => {
  const { id } = event;
  if (id === 5) {
    return false;
  }
};

export const onSelecting = (range) => {
  console.log("[onSelecting] range: ", range);
};

export const Event = ({ event }) => {
  return (
    <EventContainer isComplete={event.checkToComplete} key={event.id} style={{ fontSize: "12px" }}>
      <span style={{position: "relative", top: "2px", marginRight: "2px" }}>
        {event.checkToComplete && (
          <img style={{ width: "12px" }} src={checkIcon} alt="checkIcon" />
        )}
      </span>
      <span style={{ fontWeight: "bold", marginRight: "20px" }}>
        {event.title}
      </span>
    </EventContainer>
  );
};

export const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedEventsReducer = (state, { type, payload }) => {
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
};
