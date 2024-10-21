import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  PopupContainer,
  PopupWrapper,
  PopCardContentWrapper,
  TextWrapper,
  DateWrapper,
  ColorWrapper,
  CheckToCompleteWrapper,
  PopupOverlay,
} from "./EventModal.style";

import CancleIcon from "../../img/cancel.png";

import {setGlobalState, useGlobalState} from "../../context/GlobalState";

const colors = [
  "#251607",
  "#4F9153",
  "#FC8EAC",
  "#F5AC70",
  "#555555",
  "#326872",
  "#6F2DA8",
  "#829F82"
];


const EventModal = ({
  selectedStartDate,
  dispatchCalEvent,
  selectedEndDate,
}) => {

  const [selectedEvent] = useGlobalState("selectedEvent");

  console.log("start::", selectedStartDate, "end::", selectedEndDate)

  const [startTime, setStartTime] = useState(
    selectedEvent.start ? selectedEvent.start : dayjs()
  );

  const [endTime, setEndTime] = useState(
    selectedEvent.end ? selectedEvent.end : dayjs()
  );

  const [title, setTitle] = useState(
    selectedEvent.title ? selectedEvent.title : ""
  );

  const [description, setDescription] = useState(
    selectedEvent.description ? selectedEvent.description : ""
  );

  const [checkToComplete, setCheckToComplete] = useState(
    selectedEvent.checkToComplete ? selectedEvent.checkToComplete : ""
  );

  const [id, setId] = useState(
    selectedEvent.id ? selectedEvent.id : Date.now()
  );

  const [hexCodeColor, setHexCodeColor] = useState(
    selectedEvent.hexCodeColor ? selectedEvent.hexCodeColor : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      start: startTime,
      end: endTime,
      checkToComplete,
      id,
      hexCodeColor,
    };
    if (selectedEvent.id) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setGlobalState("showEventModal", false);
  };

  const handleDeleteEvent = () => {
    dispatchCalEvent({
      type: "delete",
      payload: selectedEvent,
    });
    setGlobalState("showEventModal", false);
  };

  const handleClosingModal = () => {
    setGlobalState("showEventModal", false);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event);
  };

  const handleCheckChange = (event) => {
    setCheckToComplete(event.target.checked);
  };

  const handleHexCodeColorState = (event) => {
    setHexCodeColor(event.target.value);
  };

  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer>
        <header>
          <div>
            <span style={{ fontWeight: "bold" }}>
              {selectedEvent.id ? "Edit Event" : "Add Event"}
            </span>
          </div>
          <div>
            <span onClick={handleClosingModal}>
              <img src={CancleIcon} alt="cancelIcon" />
            </span>
          </div>
        </header>
        <PopCardContentWrapper>
          <TextWrapper>
            <TextField
              className="filled first-child"
              autoComplete="off"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              id="outlined-basic"
              label="Add title"
              variant="filled"
            />
            <TextField
              className="filled second-child"
              autoComplete="off"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              id="outlined-basic"
              label="Add a description"
              variant="filled"
            />
          </TextWrapper>

          <DateWrapper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="dateContainer">
                <div className="start-time">
                  <label>Start Time</label>
                  <DateTimePicker
                    className="start"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="endTime">
                  <label>End Time</label>
                  <DateTimePicker
                    className="end"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </LocalizationProvider>
          </DateWrapper>

          <CheckToCompleteWrapper>
            {selectedEvent.id ? (
              <span className="completed">
                <input
                  onChange={handleCheckChange}
                  checked={selectedEvent.id ? checkToComplete : ""}
                  type="checkbox"
                  name="check"
                  id=""
                />{" "}
                Mark as completed
              </span>
            ) : null}
          </CheckToCompleteWrapper>

          <ColorWrapper>
            <div>
              <label>Event Colors</label>
            </div>
            <div>
              <label class="c0">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[0]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <label class="c1">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[1]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <label class="c2">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[2]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <labe class="c3">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[3]}
                  onChange={handleHexCodeColorState}
                />
              </labe>
              <label class="c4">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[4]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <label class="c5">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[5]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <label class="c6">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[6]}
                  onChange={handleHexCodeColorState}
                />
              </label>
              <label class="c7">
                <input
                  type="radio"
                  name="hexCode"
                  value={colors[7]}
                  onChange={handleHexCodeColorState}
                />
              </label>
            </div>
          </ColorWrapper>
        </PopCardContentWrapper>
        <div className="footer">
          <div>
            {selectedEvent.id && (
              <button type="submit" onClick={handleDeleteEvent}>
                Delete
              </button>
            )}
          </div>

          <div>
            <button
              style={{ backgroundColor: "#0D6EFD" }}
              type="submit"
              onClick={handleSubmit}
            >
              {selectedEvent.id ? "Update" : "Save"}
            </button>
            <button type="submit" onClick={handleClosingModal}>
              Cancel
            </button>
          </div>
        </div>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default EventModal;
