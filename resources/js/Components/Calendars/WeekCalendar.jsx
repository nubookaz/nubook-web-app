import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
   
} from "date-fns";

const Calendar = ({ showDetailsHandle }) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

 
  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
    if (btnType === "today") {
      setCurrentMonth(new Date());
    }
  };


  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const currentYear = format(currentMonth, "yyyy");
    const prevMonthYear = format(subMonths(currentMonth, 1), "yyyy");
    const nextMonthYear = format(addMonths(currentMonth, 1), "yyyy");
  
    const prevMonth = prevMonthYear !== currentYear ? format(subMonths(currentMonth, 1), "MMMM yyyy") : format(subMonths(currentMonth, 1), "MMMM");
    const nextMonth = nextMonthYear !== currentYear ? format(addMonths(currentMonth, 1), "MMMM yyyy") : format(addMonths(currentMonth, 1), "MMMM");
  
    return (
      
      <div className="header py-6 flex-row flex w-full justify-between">

          <div className="justify-start">
              <div className="cursor-pointer w-[15rem] text-lg font-semibold" onClick={() => changeMonthHandle("prev")}>
                  {prevMonth}
              </div>
          </div>
          <div className="justify-center w-[20rem] text-center text-xl font-bold">
              <span>{format(currentMonth, "MMM yyyy")}</span>
          </div>
          <div className="justify-end">
              <div className="cursor-pointer w-[15rem] text-lg font-semibold text-right" onClick={() => changeMonthHandle("next")}>
                  {nextMonth}
              </div>
          </div>

      </div>

    );
  };
  

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row ">{days}</div>;
  };



  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell h-full ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row h-full" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body h-full">{rows}</div>;
  };



  const renderFooter = () => {
    return (

        <div className="flex-row flex px-8 py-6 justify-between w-full">

            <div className="justify-start" onClick={() => changeWeekHandle("prev")}>
                <div className="duration-500 transition-all cursor-pointer text-slate-300 hover:text-slate-500 font-bold">
                  Prev. Week
                </div>
            </div>
 
            <div className="justify-center" onClick={() => changeMonthHandle("today")}>
                <div className="duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold">Today</div>
            </div>

            <div className="justify-end" onClick={() => changeWeekHandle("next")}>
                <div className="duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold">Next Week</div>
            </div>
 
        </div>

    );
  };



  return (
    <div className="calendar flex flex-col h-full">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export default Calendar;
 