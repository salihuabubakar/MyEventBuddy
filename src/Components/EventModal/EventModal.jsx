import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
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


const EventModal = ({ setShowEventModal, daySelected, dispatchCalEvent }) => {
  const options = [
    { value: 1, label: "Abdul" },
    { value: 2, label: "Musa" },
    { value: 3, label: "Isah" },
  ];

  // const { daySelected, dispatchCalEvent, selectedEvent } =
  //   useContext(GlobalContext);

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

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [staff, setStaff] = useState();

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [checkToComplete, setCheckToComplete] = useState();

  // {
  //   id: 2,
  //   title: "Testing 2",
  //   Staff: "Isah",
  //   description: "Tester 2",
  //   start: "September 22, 2022 08:00:00",
  //   end: "September 22, 2022 13:00:00",
  // },
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      startTime,
      endTime,
      staff,
      start: "September 23, 2022 08:00:00",
      end: "September 23, 2022 10:00:00",
      checkToComplete,
      day: daySelected,
      id: Date.now(),
    };
    dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  };

  const handleDeleteEvent = () => {
    // dispatchCalEvent({
    //   type: "delete",
    //   payload: selectedEvent,
    // });
    // setShowEventModal(false);
  };

  const handleClosingModal = () => {
    setShowEventModal(false);
  };

  return (
    <PopupWrapper>
      <PopupContainer>
        <header>
          <div>
            {/* {selectedEvent && (
              <span onClick={handleDeleteEvent}>
                <img src={TrashIcon} alt="trashIcon" />
              </span>
            )} */}
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
            // defaultValue={
            //   selectedEvent
            //     ? {
            //         value: staff?.value,
            //         label: staff?.label,
            //       }
            //     : "Select Staff"
            // }
            placeholder="Select Staff"
            options={options}
          />

          <div>
            <TextField
              style={{width: "32%"}}
              className="filled filled-nth-child"
              value={daySelected}
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
            {/* {selectedEvent ? (
              <span>
                <input
                  onChange={handleCheckChange}
                  checked={selectedEvent ? checkToComplete : ""}
                  type="checkbox"
                  name="check"
                  id=""
                />{" "}
                Completed
              </span>
            ) : null} */}
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          {/* {selectedEvent ? (
            <img src={UpdateIcon} alt="updateIcon" />
          ) : ( */}
          <img src={AddeIcon} alt="plusIcon" />
          {/* )} */}
        </button>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default EventModal;
