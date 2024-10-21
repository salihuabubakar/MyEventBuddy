import React, { useState } from 'react'
import {
  Header as HeaderDiv,
  Controls,
  InnerHeaderContainer,
} from "./header.style";
import { setGlobalState } from '../../context/GlobalState';
import { ChevronLeft, ChevronRight, ChevronDown, Plus } from 'lucide-react';


const Header = (toolbar) => {
  
  const {onView, onNavigate, date} = toolbar;

  let nowDate = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`;
  let currentDate = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;

  console.log("nowDate", nowDate);
  console.log("CurrentDate", currentDate);

    const [dayChange, setDayChange] = useState("");

    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);


    const addShift = () => {
      setGlobalState("showEventModal", true);
    }

    const views = ["Day", "Week", "Month", "Agenda"]


    const handleDayChange = (value) => {
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
      setIsMonthDropdownOpen(false)
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
    

    return (
      <div>
        <InnerHeaderContainer>
          <HeaderDiv>
            <div className="left">
            <Controls>
                <button className="p-2 hover:bg-gray-100 rounded-full" size="small" onClick={goToBack}>
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                <button className="p-2 hover:bg-gray-100 rounded-full" size="small" onClick={goToNext}>
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </Controls>

              <button
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 mr-3"
                size="large"
                onClick={goToCurrent}
              >
                Today
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                  className="flex items-center space-x-1 text-lg font-semibold"
                >
                  <span>{dayChange || 'Month'}</span>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>
                {isMonthDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {views?.map(view => (
                      <button
                        key={view}
                        onClick={() => handleDayChange(view)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
            <div className="right">
              <button
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 mr-3"
                size="sm"
                onClick={addShift}
                title='Event'
              >
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </HeaderDiv>
        </InnerHeaderContainer>
      </div>
    );
  };

  export default Header;
