import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState } = createGlobalState({
  showEventModal: false,
  selectedEvent: [],
  showProfileModal: false
});

export {setGlobalState, useGlobalState}
