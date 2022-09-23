import React, { useState } from 'react'
import moment from "../../lib/moment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Header as HeaderDiv, Controls, Span } from "./header.style";
import * as dates from "date-arithmetic";


const Header = (toolbar) => {

  const {onView, onNavigate, date} = toolbar;

    const [dayChange, setDayChange] = useState("");

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
      <HeaderDiv>
        <div className='left'>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select className="select" value={dayChange} onChange={handleDayChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem disabled value=""> Week </MenuItem>
              <MenuItem value={"Day"}>Day</MenuItem>
              <MenuItem value={"Week"}>Week</MenuItem>
              <MenuItem value={"Month"}>Month</MenuItem>
              <MenuItem value={"Agenda"}>Agenda</MenuItem>
            </Select>
          </FormControl>

          <Controls>
            <Button className="control-btn"  size="small" onClick={goToBack}>
              <ArrowBackIosIcon style={{color: "gray", width: "20px"}}/>
            </Button>
            <label className={{}}>{label()}</label>
            <Button className="control-btn"  size="small" onClick={goToNext}>
              <ArrowForwardIosIcon style={{color: "gray", width: "30px"}} />
            </Button>
          </Controls>

          <Button className="btn"  size="large" onClick={goToCurrent}>
            Today
          </Button>
        </div>
        <div className='right'>
          <Button className="btn shift-btn"  size="large" onClick={{}}>
              Add Shift
          </Button>
        </div>

      </HeaderDiv>
    );
  };

  export default Header;
