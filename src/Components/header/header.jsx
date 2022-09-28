import React, { useState } from 'react'
import moment from "../../lib/moment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Header as HeaderDiv,
  Controls,
  Span,
  HeaderContainer,
  InnerHeaderContainer,
  Overlay,
} from "./header.style";
import * as dates from "date-arithmetic";
import { setGlobalState } from '../../context/GlobalState';


const Header = (toolbar) => {

  const {onView, onNavigate, date} = toolbar;

    const [dayChange, setDayChange] = useState("");

    const [show, setShow] = useState(false);

    const toggleSidebar = async () => {
      setShow(!show);
    };

    const addShift = () => {
      setGlobalState("showEventModal", true);
    }

    const handleDayChange = (event) => {
      const value = event.target.value;
      setDayChange(value);
      if (value === "Day") {
          onView("day");
          onNavigate("day");
      } else if (value === "Week") {
          onView("week");
          onNavigate("week");
      } else if (value === "Month") {
          onView("month");
          onNavigate("month");
      } else {
          onView("agenda");
          onNavigate("agenda");
      }
    };


    const testGround = () => {
      let prev = moment().subtract(1, "days");
      let add = moment().add(1, "days");
      let day = moment(date);
      return add?.format("ddd");
    }

    console.log('saihu', testGround());

    const goToBack = () => {
      const prev = new Date().getDate - 1;
      // date.setDay(moment().subtract(1, "days"));
      dates.add(date, -1, "day");
      // date.setMonth(date.getMonth().getDay() - 1);
      onNavigate("prev");
    };

    const goToNext = () => {
      date.setMonth(date.getMonth() + 1);
      onNavigate("next");
    };

    const goToCurrent = () => {
      const now = new Date();
      date.setMonth(now.getMonth());
      date.setYear(now.getFullYear());
      onNavigate("current");
    };

    const label = () => {
      const fullDate = moment(date);
      if (dayChange === "Day") {
        return (
          <span>
            <Span>{fullDate.format("dddd")}</Span>
            <Span>{fullDate.format("MMM")}</Span>
            <Span>{fullDate.format("DD")}</Span>
          </span>
        );
      } else if (dayChange === "Week") {
        return (
          <span>
            <Span> {fullDate.format("MMM")}</Span>
            <Span><span>{fullDate.format("DD")}</span> - <span>{fullDate.format("DD")}</span></Span>
          </span>
        );
      } else if (dayChange === "Month") {
        return (
          <span>
            <Span>{fullDate.format("MMM")}</Span>
            <Span> {fullDate.format("YYYY")}</Span>
          </span>
        );
      } else {
        return (
          <span> 
            <Span>{fullDate.format("YYYY")}</Span>
          </span>
        );
      }
    };

    return (
      <HeaderContainer>
        <Button size="large" className="sidebar-button" onClick={toggleSidebar}>
          Controls
          <span style={{ marginLeft: "3px", marginTop: "3px" }}>
            <ArrowDropDownIcon />
          </span>
        </Button>
        <InnerHeaderContainer>
          <HeaderDiv className={show ? "show" : ""}>
            <div className="left">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  className="select"
                  value={dayChange}
                  onChange={handleDayChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    {" "}
                    Week{" "}
                  </MenuItem>
                  <MenuItem value={"Day"}>Day</MenuItem>
                  <MenuItem value={"Week"}>Week</MenuItem>
                  <MenuItem value={"Month"}>Month</MenuItem>
                  <MenuItem value={"Agenda"}>Agenda</MenuItem>
                </Select>
              </FormControl>

              <Controls>
                <Button className="control-btn" size="small" onClick={goToBack}>
                  <ArrowBackIosIcon style={{ color: "gray", width: "20px" }} />
                </Button>
                <label className={{}}>{label()}</label>
                <Button className="control-btn" size="small" onClick={goToNext}>
                  <ArrowForwardIosIcon
                    style={{ color: "gray", width: "30px" }}
                  />
                </Button>
              </Controls>

              <Button
                className="btn btn-today"
                size="large"
                onClick={goToCurrent}
              >
                Today
              </Button>
            </div>
            <div className="right">
              <Button className="btn shift-btn" size="large" onClick={addShift}>
                Add Shift
              </Button>
            </div>
          </HeaderDiv>
          {show && <Overlay onClick={toggleSidebar} />}
        </InnerHeaderContainer>
      </HeaderContainer>
    );
  };

  export default Header;
