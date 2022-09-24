import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState } = createGlobalState({
  showEventModal: false
});

export {setGlobalState, useGlobalState}
