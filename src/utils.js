import { setGlobalState } from "./context/GlobalState"

const dayColors = [
  "#c6cbda",
  "#fee1e8",
  "#fed7c3",
  "#f6eac2",
  "#ecd5e3",
  "#ffd8be",
  "#eceae4",
];

export const accessors = {
  draggableAccessor: (event) => !event.blocked,
  resizableAccessor: (event) => !event.blocked,
};

export const dayPropGetter = (date) => {
  //console.log('[dayPropGetter] ', date, ' day ', date.getDay());
  let currentDate = `${new Date().getDate()} ${
    new Date().getMonth() + 1
  } ${new Date().getFullYear()}`;
  let allDate = `${date.getDate()} ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
  if (allDate === currentDate)
    return {
      // style: {
      //   backgroundImage: "#E7E7E8",
      // },
    };
  return {
    style: {
      // backgroundColor: dayColors[date.getDay()],
      backgroundColor: "#fff",
      textAlign: "center",
      border: "1px solid #E7E7E8",
    },
  };
};

export const eventPropGetter = ({ event, start, end, isSelected }) => {
  let newStyle = {
    backgroundColor: "#F5AC70",
    color: "white",
    borderRadius: "5px;",
    border: "none",
    outLine: "none",
    fontWeight: "bold",
    borderLeft: "2px solid red",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  };
  if (event) {
    // newStyle.backgroundColor = "lightgreen";
    newStyle.backgroundColor = "#F5AC70";
    newStyle.color = "white";
    newStyle.fontWeight = "bold";
  }
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
  //console.log(`onDragStart: ${action}`, event);
};

export const onSelecting = (range) => {
  console.log("[onSelecting] range: ", range);
};

export const Event = ({ event }) => {
  return (
    <span>
      <>
        <span
          style={{ color: "black", fontWeight: "bold", marginRight: "10px" }}
          key={event.id}
        >
          {event.title}
        </span>
        <span>{event.description + ":  " + event.staff.label}</span>
      </>
    </span>
  );
};

export const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

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
