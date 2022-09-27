import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { 
  PopupContainer,
  PopupWrapper 
} from "./EventModal.style";

import Select from 'react-select';
import CancleIcon from "../../img/cancel.png";
import TrashIcon from "../../img/trash.png";
import AddeIcon from "../../img/add.png";
import UpdateIcon from "../../img/update.png"

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
  const options = [
    { value: 1, label: "Abdul" },
    { value: 2, label: "Musa" },
    { value: 3, label: "Isah" },
  ];


  const [selectedEvent] = useGlobalState("selectedEvent");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleCheckChange = (event) => {
    setCheckToComplete(event.target.checked);
  };

  const handleStaffChange = (event) => {
    setStaff(event);
  };

  const [title, setTitle] = useState(
    selectedEvent.title ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent.description ? selectedEvent.description : ""
  );
  const [staff, setStaff] = useState(
    selectedEvent.staff ? selectedEvent.staff : ""
  );

  const [startTime, setStartTime] = useState(
    selectedEvent.startTime ? selectedEvent.startTime : null
  );
  const [endTime, setEndTime] = useState(
    selectedEvent.endTime ? selectedEvent.endTime : null
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

  // {
  //   id: 2,
  //   title: "Testing 2",
  //   Staff: "Isah",
  //   description: "Tester 2",
  //   start: "September 22, 2022 08:00:00",
  //   end: "September 22, 2022 13:00:00",
  // },

  console.table([selectedStartDate, selectedEndDate]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      startTime,
      endTime,
      staff,
      start: selectedStartDate,
      end: selectedEndDate,
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

  console.log("dateNow", id);

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

  const handleHexCodeColorState = (e) => {
    const hexCode = e.target.value;
    console.log(hexCode);
    setHexCodeColor(hexCode);
  };

  return (
    <PopupWrapper>
      <PopupContainer>
        <header>
          <div>
            {selectedEvent.id && (
              <span onClick={handleDeleteEvent}>
                <img src={TrashIcon} alt="trashIcon" />
              </span>
            )}
            <span onClick={handleClosingModal}>
              <img src={CancleIcon} alt="cancelIcon" />
            </span>
          </div>
        </header>
        <div className="pop-card-content">
          <div className="flex">
            <TextField
              className="filled first-child"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="outlined-basic"
              label="Add title"
              variant="filled"
            />
            <TextField
              className="filled second-child"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="outlined-basic"
              label="Add a description"
              variant="filled"
            />
          </div>

          <Select
            onChange={handleStaffChange}
            defaultValue={
              selectedEvent.staff
                ? {
                    value: staff?.value,
                    label: staff?.label,
                  }
                : "Select Staff"
            }
            placeholder="Select Staff"
            options={options}
          />

          <div>
            <TextField
              style={{ width: "32%" }}
              className="filled filled-nth-child"
              value={selectedStartDate}
              disabled
              variant="standard"
            />{" "}
            <br />
            <span>
              Start Time:{" "}
              <input
                value={startTime}
                onChange={handleStartTimeChange}
                type="time"
                id="appt"
                name="startTime"
              />
            </span>
            <span>
              End Time:{" "}
              <input
                value={endTime}
                onChange={handleEndTimeChange}
                type="time"
                id="appt"
                name="endTime"
              />
            </span>{" "}
            <br />
            <br />
            {selectedEvent.id ? (
              <span>
                <input
                  onChange={handleCheckChange}
                  checked={selectedEvent.id ? checkToComplete : ""}
                  type="checkbox"
                  name="check"
                  id=""
                />{" "}
                Completed
              </span>
            ) : null}
            <div className="you">
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
            </div>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          {selectedEvent.id ? (
            <img src={UpdateIcon} alt="updateIcon" />
          ) : (
            <img src={AddeIcon} alt="plusIcon" />
          )}
        </button>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default EventModal;
