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
import { setGlobalState } from '../../context/GlobalState';


const Header = (toolbar) => {

  const {onView, onNavigate, date} = toolbar;

  let nowDate = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`;
  let currentDate = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;

  console.log("nowDate", nowDate);
  console.log("CurrentDate", currentDate);

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
      } else if (value === "Agenda") {
        onView("agenda");
        onNavigate("agenda");
      }
    };

    const goToBack = () => {
      let newDate;
      if(dayChange === "Day") {
        newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 1)
      }else if (dayChange === "Week") {
        newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 1)
      }else if(dayChange === "Month" || dayChange === "Agenda") {
        newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      }
      onNavigate("prev", newDate);
    };

    const goToNext = () => {
      let newDate;
      if(dayChange === "Day") {
        newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1)
      }else if (dayChange === "Week") {
        newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 1)
      }
      else if(dayChange === "Month" || dayChange === "Agenda") {
        newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      }
      onNavigate("next", newDate);
    };

    const goToCurrent = () => {
      const now = new Date();
      date.setMonth(now.getMonth());
      date.setYear(now.getFullYear());
      onNavigate("current", now);
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
        let startOfTheWeek = new Date(fullDate.startOf("week")._d).toDateString();
        startOfTheWeek = startOfTheWeek.split(" ").slice(2, 3).join(" ");

        let endOfTheWeek = new Date(fullDate.endOf("week")._d).toDateString();
        endOfTheWeek = endOfTheWeek.split(" ").slice(2, 3).join(" ");

        return (
          <span>
            <Span> {fullDate.format("MMM")}</Span>
            <Span>
              <span>{startOfTheWeek}</span> - <span>{endOfTheWeek}</span>
            </Span>
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
        let startOfTheMonth = new Date(fullDate.startOf("month")._d).toDateString();
        startOfTheMonth = startOfTheMonth.split(" ").slice(2, 3).join(" ");

        let endOfTheMonth = new Date(fullDate.endOf("month")._d).toDateString();
        endOfTheMonth = endOfTheMonth.split(" ").slice(2, 3).join(" ");
        return (
          <span>
            <Span>{fullDate.format("MMM")}</Span>
            <Span>
              <span>{startOfTheMonth}</span> - <span>{endOfTheMonth}</span>
            </Span>
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
                  <MenuItem value={"Day"}>DAY</MenuItem>
                  <MenuItem value={"Week"}>WEEK</MenuItem>
                  <MenuItem value={"Month"}>MONTH</MenuItem>
                  <MenuItem value={"Agenda"}>SCHEDULE</MenuItem>
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
